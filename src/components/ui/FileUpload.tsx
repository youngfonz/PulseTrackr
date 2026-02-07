'use client'

import { useState } from 'react'

interface FileUploadProps {
  onUploadComplete: (file: { path: string; name: string; type: string; size: number }) => void
  accept?: string
  maxSize?: number // in MB
  label?: string
}

export function FileUpload({
  onUploadComplete,
  accept = 'image/*,application/pdf',
  maxSize = 10,
  label = 'Choose file'
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    const allowedTypes = accept.split(',').map(t => t.trim())
    const fileType = file.type
    const isAllowed = allowedTypes.some(type => {
      if (type === 'image/*') return fileType.startsWith('image/')
      if (type === 'application/pdf') return fileType === 'application/pdf'
      return fileType === type
    })

    if (!isAllowed) {
      setError('Invalid file type')
      return
    }

    try {
      setUploading(true)
      setProgress(0)

      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'general')

      // Upload to server
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded / e.total) * 100)
          setProgress(percentage)
        }
      })

      await new Promise<void>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText)
            onUploadComplete({
              path: data.path,
              name: data.name,
              type: data.type,
              size: data.size,
            })
            resolve()
          } else {
            const error = JSON.parse(xhr.responseText)
            reject(new Error(error.error || 'Upload failed'))
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'))
        })

        xhr.open('POST', '/api/upload')
        xhr.send(formData)
      })

      // Reset input
      e.target.value = ''
      setProgress(0)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="inline-block">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium transition-colors cursor-pointer ${
          uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'
        }`}>
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading... {progress}%
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {label}
            </>
          )}
        </span>
      </label>

      {uploading && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
