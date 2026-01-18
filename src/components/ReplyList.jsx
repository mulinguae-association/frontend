import React, { useEffect, useState } from 'react';

export default function ReplyList({ parentId, initialReplies = [], initialCount = 0, previewLimit = 2, apiBase = '/comments' }) {
  const [replies, setReplies] = useState(initialReplies);
  const [totalCount, setTotalCount] = useState(initialCount);
  const [page, setPage] = useState(initialReplies.length ? 2 : 1);
  const [limit] = useState(previewLimit);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (initialReplies.length === 0) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMore() {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${apiBase}/remaining-replies?parentCommentIds=${encodeURIComponent(parentId)}&pageParam=${page}&limit=${limit}`
      );
      const data = await res.json();
      const newReplies = data.remainingReplies || [];
      setReplies(prev => [...prev, ...newReplies]);
      // If backend doesn't provide total, try to preserve initialCount
      if (data.totalCount) setTotalCount(data.totalCount);
      if (newReplies.length < limit) setHasMore(false);
      setPage(p => p + 1);
    } catch (err) {
      console.error('Failed to load replies', err);
    } finally {
      setLoading(false);
    }
  }

  const remaining = Math.max(0, (totalCount || initialCount) - replies.length);
  const nextChunk = Math.min(limit, remaining);

  return (
    <div className="replies">
      {replies.map(r => (
        <div key={r._id} className="reply">
          <div className="reply-author">{r.postedBy?.name}</div>
          <div className="reply-content">{r.content}</div>
        </div>
      ))}

      {remaining > 0 && (
        <button onClick={loadMore} disabled={loading} className="show-more-replies">
          {loading ? 'Loading…' : `Show ${nextChunk} more repl${nextChunk > 1 ? 'ies' : 'y'} (${remaining} left)`}
        </button>
      )}
    </div>
  );
}
