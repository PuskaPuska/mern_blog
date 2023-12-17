import React from 'react';
import styles from './UserInfo.module.scss';
import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import { useDispatch } from 'react-redux'
import { fetchAddSubscription } from '../../store/actions/posts'



export const UserInfo = ({ _id, avatarUrl, fullName, additionalText, isEditable }) => {

  const dispatch = useDispatch();

	return (
		<div className={styles.info}>
			<div className={styles.root}>
				<img
					className={styles.avatar}
					src={avatarUrl || '/noavatar.png'}
					alt={fullName}
				/>
				<div className={styles.userDetails}>
					<span className={styles.userName}>{fullName}</span>
					<span className={styles.additional}>{additionalText}</span>
				</div>
			</div>
			{!isEditable && (
				<Checkbox
					onClick={() => 
						dispatch(fetchAddSubscription(_id))}
					icon={<BookmarkBorderIcon />}
					checkedIcon={<BookmarkIcon />}
				/>
			)}
		</div>
	)
}
