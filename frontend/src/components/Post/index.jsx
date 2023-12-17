import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'


import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchRemovePost, fetchAddFavorite } from '../../store/actions/posts';
import { baseURL } from '../../axios/axios.js'

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
	isFavorite,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{!isEditable && (
				<div className={styles.editButtons}>
					<Checkbox
						onClick={() => dispatch(fetchAddFavorite(id))}
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite />}
					/>
				</div>
			)}
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color='primary'>
							<EditIcon />
						</IconButton>
					</Link>

					<IconButton onClick={onClickRemove} color='secondary'>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={`${baseURL}${imageUrl}`}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo
					{...user}
					additionalText={createdAt}
					isEditable={isEditable}
				/>
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					{tags.length > 0 && (
						<ul className={styles.tags}>
							{tags.map((name) => (
								<li key={name}>
									<Link to={`/tags/${name}`}>#{name}</Link>
								</li>
							))}
						</ul>
					)}
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
};
