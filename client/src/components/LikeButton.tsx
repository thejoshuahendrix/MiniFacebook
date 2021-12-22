import React, { FC, useEffect, useState } from 'react'
import { Heart } from 'react-feather'

interface Props {
    likes: string[];
    like: boolean | undefined,
    likeOnClick: () => void;
}


const LikeButton: FC<Props> = ({ likes, like, likeOnClick }) => {
    return (
        <div>
            {!like ? <Heart style={{ cursor: "pointer" }}
                onClick={likeOnClick} /> :
                <Heart style={{ cursor: "pointer" }} onClick={likeOnClick} fill='red' />}
            {likes.length}
        </div>
    )
}

export default LikeButton

