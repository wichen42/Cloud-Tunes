import './SplashTracks.css';
import * as trackActions from '../../store/track';
import { useSelector } from 'react-redux';
import { shuffleArr } from '../../Util';
import SplashTrackItem from '../SplashTrackItem';
import { useEffect } from 'react';
import { useState } from 'react';

const SplashTracks = () => {
    
    const trackList = [
        {
            "id": 34,
            "title": "Going To California",
            "username": "karin",
            "genre": "Classical",
            "description": "Nostrum est et. Nostrum modi et. Facilis est fuga. Eaque tenetur delectus. Quibusdam sequi et.",
            "userId": 6,
            "createdAt": "2023-01-19T18:18:05.848Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/3z8wx1ywsgtqazc1a2tiak3v1e3x?response-content-disposition=attachment%3B%20filename%3D%22track9.mp3%22%3B%20filename%2A%3DUTF-8%27%27track9.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192954Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8cd46659d1148b4eeadaada65fc697b096b748dbd47654e2cebcb4ac6f6adef0",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/c1tbr5u5iwzewfaq7ml0l62ptdws?response-content-disposition=inline%3B%20filename%3D%22cover7.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover7.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192954Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5cebb2cc09061b4d3bf73849a104a42598d8995491f187c5b8c6d07f13ffc9c9"
        },
        {
            "id": 45,
            "title": "Barracuda",
            "username": "ulrike",
            "genre": "Stage And Screen",
            "description": "Quo maxime perferendis. Eaque consequatur nam. Quod sit exercitationem. Assumenda eum repellat. Ipsam possimus voluptatem.",
            "userId": 8,
            "createdAt": "2023-01-18T13:24:13.536Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/tpgh6f5993wlez9lk8m8lox4wv99?response-content-disposition=attachment%3B%20filename%3D%22track22.mp3%22%3B%20filename%2A%3DUTF-8%27%27track22.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192954Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=862b05d9f85e2c948d61863a5d0b8df765031fb7e5987816f669dff8971a8c1a",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/6eajg5xyp8y02fe6iuiq7rhnl05k?response-content-disposition=inline%3B%20filename%3D%22cover17.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover17.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192954Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=4afe3554d03521380ae8305df72f25e1e1adc88b1f5ad8daa47d6384c9c3ce1a"
        },
        {
            "id": 63,
            "title": "In My Life",
            "username": "codi_klein",
            "genre": "Rap",
            "description": "Cupiditate velit doloribus. Molestiae commodi et. Quia enim et. Optio officia est. Pariatur voluptatem ea.",
            "userId": 13,
            "createdAt": "2023-01-18T17:14:57.607Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/dbdb75393e3anjdm1vad5cu0200f?response-content-disposition=attachment%3B%20filename%3D%22track4.mp3%22%3B%20filename%2A%3DUTF-8%27%27track4.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b628b4f6185b7b05363f866faf9b6a54aba735a8d822b25b9b640ad0f8a7734e",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/m3f0z4kverz703tobleez8a0v9ol?response-content-disposition=inline%3B%20filename%3D%22cover17.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover17.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=79a378e4f81f094fd2aab9deca785a7e0621bccb3aa7b3e3d6ebfe3aae5c9521"
        },
        {
            "id": 75,
            "title": "I've Seen All Good People",
            "username": "guadalupe",
            "genre": "Stage And Screen",
            "description": "Accusantium quasi ut. Ut aut ratione. Recusandae laboriosam quis. Quidem doloribus quisquam. Et iusto provident.",
            "userId": 15,
            "createdAt": "2023-01-19T06:28:41.787Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/s3v3ps6xcxna7q4apvk303h22zgs?response-content-disposition=attachment%3B%20filename%3D%22track29.mp3%22%3B%20filename%2A%3DUTF-8%27%27track29.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=91cfee9cdd86dc831e80d44814ac8f347bb36f1699884e720e2f5a48cd680538",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/5apyeytkshoo2x30gzdby8uoxekw?response-content-disposition=inline%3B%20filename%3D%22cover9.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover9.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=3c6063b1c90d122e36a0ecb99a4c75e528a4bdd3c0dabb1e446c3d8ce47843b1"
        },
        {
            "id": 89,
            "title": "Levon",
            "username": "shelley_oreilly",
            "genre": "Non Music",
            "description": "Ut optio quia. Aut dolorem dolor. Voluptatem corrupti sed. Tempora pariatur odio. Pariatur voluptatem sed.",
            "userId": 18,
            "createdAt": "2023-01-19T17:09:48.272Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/09d0d0fp7m7x2vzd2gjlx1x1puhb?response-content-disposition=attachment%3B%20filename%3D%22track25.mp3%22%3B%20filename%2A%3DUTF-8%27%27track25.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=302ead160f602774ec54420b9eb41fd4e768216a0960ec4454ad47cb689c1c86",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/0sue0c0xm12s4x123jtvpgy5zhx6?response-content-disposition=inline%3B%20filename%3D%22cover28.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover28.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9a539cab8780cfa7b6e8d7a509ce2371c661e673737367735231302ab1d53339"
        },
        {
            "id": 100,
            "title": "Rocky Racoon",
            "username": "josef",
            "genre": "Latin",
            "description": "Quia sit enim. Cum aliquid iste. Veniam error et. Occaecati quo deleniti. Qui voluptatem omnis.",
            "userId": 20,
            "createdAt": "2023-01-18T00:21:34.448Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/9kv3qho86ptwuqrpzwqctawjijfw?response-content-disposition=attachment%3B%20filename%3D%22track12.mp3%22%3B%20filename%2A%3DUTF-8%27%27track12.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=2ff36508a20ee62d74aa1c7def0f2f9417db706bc3bd4a33e3fab35e65158b38",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/dmwba2ax2nv9bhu2mlwdcgc2pit0?response-content-disposition=inline%3B%20filename%3D%22cover12.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover12.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8c137e2b9a6e03fe8d5d9f8d586b19e5658cd74c0011656f528e6f572d64aa55"
        },
        {
            "id": 115,
            "title": "I've Seen All Good People",
            "username": "buck_dickens",
            "genre": "Rap",
            "description": "Autem aut veritatis. Beatae voluptates quos. Velit consequuntur dolorem. Recusandae velit alias. Asperiores pariatur dolores.",
            "userId": 23,
            "createdAt": "2023-01-19T14:38:00.055Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/3yxl3ffyqoa0tuv0uvr5tjs0n44q?response-content-disposition=attachment%3B%20filename%3D%22track3.mp3%22%3B%20filename%2A%3DUTF-8%27%27track3.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f5b2cd4ac4520f219749ccd28eb043b6f5d00c8aa7dadce57833bf2580235931",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/hn1z1a7yhldjyo5uy5qfalargdyp?response-content-disposition=inline%3B%20filename%3D%22cover13.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover13.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=48027d04a38b56a93d821aeab665da632c95212fb2f4e8071918897215535d99"
        },
        {
            "id": 127,
            "title": "Breakdown",
            "username": "willette",
            "genre": "Reggae",
            "description": "Animi ipsam neque. Itaque sint a. Voluptas vitae fugiat. Id quia veniam. Excepturi sequi neque.",
            "userId": 26,
            "createdAt": "2023-01-19T11:38:01.582Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/lv0rbpcx5otcf889hr2o0mxl3s70?response-content-disposition=attachment%3B%20filename%3D%22track17.mp3%22%3B%20filename%2A%3DUTF-8%27%27track17.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5124accb8adf0104a9426a93944d3de1295c99ead320b16d8c80694557e983c6",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/fkvayy4yuoarentk93kgwvyyc1hx?response-content-disposition=inline%3B%20filename%3D%22cover9.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover9.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5db58121eb09eb8a68c7235e3099976542b8f66a1b6370965a8c10495c4abfa9"
        },
        {
            "id": 135,
            "title": "House of the Rising Sun",
            "username": "brendon_kunde",
            "genre": "Rock",
            "description": "Eius in non. Ratione sit nisi. Et et ratione. Commodi dolorem odio. Qui eos maxime.",
            "userId": 27,
            "createdAt": "2023-01-19T03:39:55.044Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/qwsxwl39gxp6fnmfdyytr158adb9?response-content-disposition=attachment%3B%20filename%3D%22track23.mp3%22%3B%20filename%2A%3DUTF-8%27%27track23.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=3992e5bb85b021c270c8ea6e97b13acafeb983f2b080c641022f24e97a49f49d",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/muc28yfu31iit0wwb0mw4d07v4w7?response-content-disposition=inline%3B%20filename%3D%22cover13.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover13.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192955Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=88a9c87065a77fbadfd2452a66f7aaa779d764c068332e20ed9d470141066e7e"
        },
        {
            "id": 2,
            "title": "Maybe I'm Amazed",
            "username": "demolition",
            "genre": "Funk",
            "description": "[\"Nostrum libero eos. Autem assumenda ut. Aspernatur voluptate et.\", \"Amet perspiciatis quasi. Et est a. Quam omnis dolores.\", \"Sequi officia quidem. Saepe natus aut. Ratione sit quis.\"]",
            "userId": 1,
            "createdAt": "2023-01-17T22:53:08.389Z",
            "trackUrl": "https://cloud-tunes-dev.s3.amazonaws.com/m1y7lm7mdj9dw53amyq3kxe3pm2w?response-content-disposition=attachment%3B%20filename%3D%22track2.mp3%22%3B%20filename%2A%3DUTF-8%27%27track2.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192954Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=79d4cf18059e2e9beeabc3275ca711c1971e883071a187dbcf30a352f207fabc",
            "imageUrl": "https://cloud-tunes-dev.s3.amazonaws.com/dfrhl4bkwsohezkcso1ltb9wtpu0?response-content-disposition=inline%3B%20filename%3D%22cover2.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover2.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QO4E3WYI22OHNZR%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T192954Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=bdfebbd41bb245ff7d895a45f099728917b969a3eb010d8e5916ca990eafb3fe"
        }
    ]
    // const trackList = shuffleArr(tracks, 10);
    const trackItem = trackList.map(track => {
        return <SplashTrackItem track={track} />
    });

    return ( 
        <div className='splash-track-container'>
            {trackItem}
        </div>
     );
}
 
export default SplashTracks;