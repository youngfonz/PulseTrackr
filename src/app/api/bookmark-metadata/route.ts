import { NextRequest, NextResponse } from 'next/server';

interface BookmarkMetadata {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  type: 'youtube' | 'twitter';
}

function getBookmarkType(url: string): 'youtube' | 'twitter' | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // YouTube detection
    if (
      hostname.includes('youtube.com') ||
      hostname.includes('youtu.be')
    ) {
      return 'youtube';
    }

    // Twitter/X detection
    if (
      hostname.includes('twitter.com') ||
      hostname.includes('x.com')
    ) {
      return 'twitter';
    }

    return null;
  } catch {
    return null;
  }
}

async function fetchYouTubeMetadata(url: string): Promise<BookmarkMetadata | null> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      title: data.title || 'Untitled Video',
      description: data.author_name ? `By ${data.author_name}` : undefined,
      thumbnailUrl: data.thumbnail_url || undefined,
      type: 'youtube',
    };
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error);
    return null;
  }
}

async function fetchTwitterMetadata(url: string): Promise<BookmarkMetadata | null> {
  try {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Extract author name from HTML if available
    let description = undefined;
    if (data.author_name) {
      description = `By ${data.author_name}`;
    }

    return {
      title: data.author_name ? `Post by ${data.author_name}` : 'X Post',
      description,
      thumbnailUrl: undefined, // Twitter oEmbed doesn't provide thumbnails
      type: 'twitter',
    };
  } catch (error) {
    console.error('Error fetching Twitter metadata:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const bookmarkType = getBookmarkType(url);

    if (!bookmarkType) {
      return NextResponse.json(
        { error: 'Unsupported URL. Only YouTube and X (Twitter) URLs are supported.' },
        { status: 400 }
      );
    }

    let metadata: BookmarkMetadata | null = null;

    if (bookmarkType === 'youtube') {
      metadata = await fetchYouTubeMetadata(url);
    } else if (bookmarkType === 'twitter') {
      metadata = await fetchTwitterMetadata(url);
    }

    if (!metadata) {
      return NextResponse.json(
        {
          error: 'Failed to fetch metadata. You can still create the bookmark manually.',
          fallback: {
            title: url,
            type: bookmarkType,
          }
        },
        { status: 200 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error in bookmark-metadata API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
