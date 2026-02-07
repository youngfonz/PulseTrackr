'use client'

import { useState, useEffect } from 'react'
import { createBookmarkTask, getAllTags } from '@/actions/tasks'
import { TagInput } from '@/components/ui/TagInput'
import { Loader2, ExternalLink, Youtube, Twitter } from 'lucide-react'

interface BookmarkMetadata {
  title: string
  description?: string
  thumbnailUrl?: string
  type: 'youtube' | 'twitter'
}

interface AddBookmarkFormProps {
  projectId: string
}

export function AddBookmarkForm({ projectId }: AddBookmarkFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [metadata, setMetadata] = useState<BookmarkMetadata | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [manualTitle, setManualTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getAllTags().then(setAllTags)
  }, [])

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase()

      // YouTube validation
      if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
        return true
      }

      // Twitter/X validation
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        return urlObj.pathname.includes('/status/')
      }

      return false
    } catch {
      return false
    }
  }

  const fetchMetadata = async () => {
    if (!url.trim()) return

    if (!validateUrl(url)) {
      setError('Please enter a valid YouTube or X (Twitter) URL')
      return
    }

    setLoading(true)
    setError(null)
    setMetadata(null)

    try {
      const response = await fetch('/api/bookmark-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.error) {
          setError(data.error)
          if (data.fallback) {
            setMetadata(data.fallback)
          }
        } else {
          setMetadata(data)
          setManualTitle(data.title)
        }
      } else {
        setError(data.error || 'Failed to fetch metadata')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUrlBlur = () => {
    if (url && !metadata) {
      fetchMetadata()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url || !metadata) {
      setError('Please enter a valid URL and wait for metadata to load')
      return
    }

    if (!manualTitle.trim()) {
      setError('Please provide a title for the bookmark')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await createBookmarkTask(projectId, {
        url,
        title: manualTitle,
        description: metadata.description,
        thumbnailUrl: metadata.thumbnailUrl,
        bookmarkType: metadata.type,
        tags,
        priority,
        dueDate: dueDate || undefined,
        notes: notes || undefined,
      })

      // Reset form
      setUrl('')
      setMetadata(null)
      setManualTitle('')
      setTags([])
      setPriority('medium')
      setDueDate('')
      setNotes('')
      setIsOpen(false)
    } catch (err) {
      setError('Failed to create bookmark. Please try again.')
      console.error('Submit error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
      >
        + Add Bookmark
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-1">
          YouTube or X URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setError(null)
            }}
            onBlur={handleUrlBlur}
            onPaste={(e) => {
              setTimeout(fetchMetadata, 100)
            }}
            placeholder="https://youtube.com/watch?v=... or https://x.com/.../status/..."
            className="flex-1 p-2 border rounded-md text-sm"
            disabled={loading || submitting}
          />
          <button
            type="button"
            onClick={fetchMetadata}
            disabled={!url || loading || submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading
              </>
            ) : (
              'Fetch'
            )}
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>

      {metadata && (
        <>
          <div className="p-3 border rounded-md bg-white">
            <div className="flex items-start gap-3">
              {metadata.thumbnailUrl && (
                <img
                  src={metadata.thumbnailUrl}
                  alt=""
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {metadata.type === 'youtube' ? (
                    <Youtube className="w-5 h-5 text-red-600" />
                  ) : (
                    <Twitter className="w-5 h-5 text-blue-400" />
                  )}
                  <span className="text-xs font-medium text-gray-600 uppercase">
                    {metadata.type}
                  </span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Edit title..."
                  className="w-full p-2 border rounded text-sm font-medium mb-2"
                  disabled={submitting}
                />
                {metadata.description && (
                  <p className="text-sm text-gray-600">{metadata.description}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags
            </label>
            <TagInput
              value={tags}
              onChange={setTags}
              suggestions={allTags}
              placeholder="Add tags..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                disabled={submitting}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              rows={3}
              className="w-full p-2 border rounded-md text-sm"
              disabled={submitting}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || !manualTitle.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Bookmark'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                setUrl('')
                setMetadata(null)
                setManualTitle('')
                setError(null)
              }}
              disabled={submitting}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </form>
  )
}
