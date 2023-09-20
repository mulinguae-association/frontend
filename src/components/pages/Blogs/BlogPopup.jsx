import React, { useState } from "react";
import "./BlogPopup.scss";
import { formatRelativeTime } from "../../HelperComponents/RelativeDate";
import Like from "./Like";
import EllipsisMenu from "./EllipsisMenu";
import UpdateComment from "./UpdateComment";
import { useCommentEditState } from "../../HelperComponents/useCommentEditState";

const BlogPopup = ({
	blog,
	show,
	showFullContent,
	showAllComments,
	replyContent,
	setReplyContent,
	handleSubmit,
	comments,
	handleRemoveComment,
	clearReply,
	updateCommentLocally,
}) => {
	const [likes, setLikes] = useState({});
	const [likeCounts, setLikeCounts] = useState({});
	const { isEditComment, handleEdit, setIsEditComment, editCommentId } =
		useCommentEditState();

	const handleClick = (id) => {
		const updatedLikes = { ...likes };
		const updatedLikeCounts = { ...likeCounts };

		updatedLikeCounts[id] =
			(updatedLikeCounts[id] || 0) + (updatedLikes[id] ? -1 : 1);
		updatedLikes[id] = !updatedLikes[id];

		setLikeCounts(updatedLikeCounts);
		setLikes(updatedLikes);
	};

	return (
		<div className='blog_popup'>
			{showFullContent && (
				<>
					<h1 className='blog_title'>{blog.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: blog.content }} />
				</>
			)}
			{showAllComments && (
				<>
					<div className='comments_header'>
						<span className='special'>{blog?.title}</span>
						<h1 className='comment_title'>Comments</h1>
					</div>
					{comments.map((comment) =>
						comment.status === "accepted" ? (
							<div key={comment._id} className='comments_content'>
								<div className='comment'>
									<EllipsisMenu
										handleDelete={() => handleRemoveComment(comment?._id)}
										handleEdit={(state) => handleEdit(comment?._id, state)}
									/>
									<div className='comment_head'>
										<h2>@{comment?.author}</h2>
										<span className='comment_date'>
											{formatRelativeTime(comment?.createdAt)}
										</span>
									</div>
									{isEditComment && editCommentId === comment._id ? (
										<UpdateComment
											editCommentId={comment._id}
											comments={comments}
											initialValue={comment?.content}
											setIsEditComment={setIsEditComment}
											updateCommentLocally={updateCommentLocally}
										/>
									) : (
										<p className='comment_content'>{comment?.content}</p>
									)}
									<div className='replies'>
										{comment &&
											comment?.replies.map((reply) =>
												reply.status === "accepted" ? (
													<div
														style={
															isEditComment && editCommentId === reply._id
																? { width: "100%" }
																: { width: "fit-content" }
														}
														key={reply?._id}
														className='nested_comments'>
														<EllipsisMenu
															handleDelete={() =>
																handleRemoveComment(reply?._id)
															}
															handleEdit={(state) =>
																handleEdit(reply?._id, state)
															}
														/>
														{isEditComment && editCommentId === reply._id ? (
															<UpdateComment
																editCommentId={reply._id}
																comments={comments}
																initialValue={reply?.content}
																setIsEditComment={setIsEditComment}
																updateCommentLocally={updateCommentLocally}
															/>
														) : (
															<div>{reply?.content}</div>
														)}
														<span>{formatRelativeTime(reply.createdAt)}</span>
														<Like
															isLiked={likes[reply._id] || false}
															likeCount={likeCounts[reply._id] || 0}
															handleClick={() => handleClick(reply._id)}
														/>
													</div>
												) : (
													""
												)
											)}
									</div>
									<div className='reply_form'>
										<textarea
											value={replyContent[comment?._id]}
											onChange={(e) => setReplyContent(e.target.value)}
											placeholder='Write your reply...'
											required
										/>
										<button
											onClick={() => {
												handleSubmit(comment?._id);
												clearReply(comment._id);
											}}>
											Submit Reply
										</button>
									</div>
								</div>
							</div>
						) : (
							""
						)
					)}
				</>
			)}
			<button onClick={() => show(false)} className='blog_close'>
				x
			</button>
		</div>
	);
};

export default React.memo(BlogPopup);
