import Link from "next/link";

import AuthCheck from "../components/Authentication/AuthCheck";

export default function IdeaFeed({ ideas, admin }) {
  return ideas
    ? ideas.map((idea) => (
        <IdeaItem idea={idea} key={idea.slug} admin={admin} />
      ))
    : null;
}

function IdeaItem({ idea, admin = false }) {
  return (
    <div className="flex items-center justify-center px-4 pt-8 sm:px-6 lg:px-8 drop-shadow-xl">
      <div className="w-[80%]  p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
        <div className="bg-white rounded-xl">
          <Link href={`/${idea.username}`}>
            <a>
              <strong className="italic">@{idea.username}</strong>
            </a>
          </Link>

          <Link href={`/${idea.username}/${idea.slug}`}>
            <a>
              <h2>{idea.title}</h2>
              <p>{idea.content}</p>
            </a>
          </Link>

          <footer>
            <span className="push-left">💗 {idea.heartCount || 0} Hearts</span>
          </footer>

          {/* If admin view, show extra controls for user */}
          {admin && (
            <>
              <Link href={`/admin/${idea.slug}`}>
                <h3>
                  <button className="btn-blue">Edit</button>
                </h3>
              </Link>

              {idea.published ? (
                <p className="text-success">Live</p>
              ) : (
                <p className="text-danger">Unpublished</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
