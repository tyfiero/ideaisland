import Link from 'next/link';
// import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function PostContent({ idea }) {
  const createdAt = typeof idea?.createdAt === 'number' ? new Date(idea.createdAt) : idea.createdAt.toDate();

  return (
    <div className="card">
      <h1>{idea?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${idea.username}/`}>
          <a className="text-info">@{idea.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      {/* <ReactMarkdown>{post?.content}</ReactMarkdown> */}
      {idea?.content}
    </div>
  );
}