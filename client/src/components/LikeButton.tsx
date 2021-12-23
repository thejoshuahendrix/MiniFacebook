import React, { FC, useEffect, useState } from 'react'
import { Heart } from 'react-feather'
import styled from 'styled-components'

interface Props {
    likes: string[];
    like: boolean | undefined,
    likeOnClick: () => void;
}

const LikeCount = styled.div`
    color:${({ theme }) => theme.text.secondary};
`

const LikeButton: FC<Props> = ({ likes, like, likeOnClick }) => {
    return (
        <div style={{ display: 'flex', justifyContent: "flex-start", gap: '4px' }}>
            <LikeCount style={{ marginLeft: '5px' }}>{likes.length}</LikeCount>
            {!like ? <Heart style={{ color: "#0bf2fa", cursor: "pointer" }}
                onClick={likeOnClick} /> :
                <Heart style={{ color: "#0bf2fa", cursor: "pointer" }} onClick={likeOnClick} fill='#0bf2fa' />}

            {likes.map((likeName, i) => {
                let map = [];
                console.log(i)
                if (i == 3) {
                    map.push(<div style={{ marginLeft: '0px' }}>and {likes.length - 3} others</div>)
                } else if (i == 2 && likes.length == 3) {
                    map.push(<div style={{ marginLeft: '0px' }}>,  and {likeName} </div>)
                } else if (i == 2) {
                    map.push(<div style={{ marginLeft: '0px' }}>, {likeName} </div>)
                } else if (i == 1 && likes.length == 2) {
                    map.push(<div style={{ marginLeft: '0px' }}>and {likeName}</div>)
                } else if (i == 1) {
                    map.push(<div style={{ marginLeft: '0px' }}>, {likeName} </div>)
                } else if (i == 0) {
                    map.push(<div style={{ marginLeft: '5px' }}>{likeName}</div>)
                }
                return <div>
                    {map}
                </div>
            })}{likes.length == 1 ? "likes this..." : "like this..."}

        </div>
    )
}

export default LikeButton

