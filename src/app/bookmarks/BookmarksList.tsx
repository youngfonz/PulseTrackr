'use client'

import Link from 'next/link'

interface Bookmark {
  id: string
  title: string
  description: string | null
  url: string | null
  bookmarkType: string | null
  thumbnailUrl: string | null
  tags: string[]
  createdAt: Date
  project: {
    id: string
    name: string
  }
}

function TypeIcon({ type, size = 'sm' }: { type: string | null; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-12 h-12' : 'w-5 h-5'

  if (type === 'youtube') {
    return (
      <svg className={`${cls} text-red-500`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  }
  if (type === 'twitter') {
    return (
      <svg className={`${cls} text-foreground`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  }
  return (
    <svg className={`${cls} text-muted-foreground`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}

function TypeBadge({ type }: { type: string | null }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${
      type === 'youtube'
        ? 'bg-red-500 text-white'
        : type === 'twitter'
        ? 'bg-foreground text-background'
        : 'bg-primary text-primary-foreground'
    }`}>
      {type === 'youtube' ? 'YouTube' : type === 'twitter' ? 'X' : 'Website'}
    </span>
  )
}

function BookmarkMeta({ bookmark }: { bookmark: Bookmark }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href={`/projects/${bookmark.project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {bookmark.project.name}
        </Link>
        <span className="text-xs text-muted-foreground">
          {new Date(bookmark.createdAt).toLocaleDateString()}
        </span>
      </div>
      {bookmark.tags.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {bookmark.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
            >
              {tag}
            </span>
          ))}
          {bookmark.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{bookmark.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </>
  )
}

function ImageCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <a
      href={bookmark.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={bookmark.thumbnailUrl!}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <TypeBadge type={bookmark.bookmarkType} />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {bookmark.title}
        </h3>
        <div className="mt-2">
          <BookmarkMeta bookmark={bookmark} />
        </div>
      </div>
    </a>
  )
}

function CompactCard({ bookmark }: { bookmark: Bookmark }) {
  const displayUrl = bookmark.url
    ? bookmark.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
    : ''

  return (
    <a
      href={bookmark.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 border border-border rounded-lg p-3 hover:border-primary/50 hover:shadow-md transition-all"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-muted flex items-center justify-center">
        <TypeIcon type={bookmark.bookmarkType} size="sm" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {bookmark.title}
          </h3>
          <TypeBadge type={bookmark.bookmarkType} />
        </div>
        {displayUrl && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{displayUrl}</p>
        )}
        <div className="mt-1.5">
          <BookmarkMeta bookmark={bookmark} />
        </div>
      </div>
    </a>
  )
}

export function BookmarksList({ bookmarks }: { bookmarks: Bookmark[] }) {
  const withImages = bookmarks.filter((b) => b.thumbnailUrl)
  const withoutImages = bookmarks.filter((b) => !b.thumbnailUrl)

  return (
    <div className="space-y-6">
      {withImages.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {withImages.map((bookmark) => (
            <ImageCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
      {withoutImages.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {withoutImages.map((bookmark) => (
            <CompactCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  )
}
