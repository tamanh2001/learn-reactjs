import React from 'react';
import AlbumList from './components/AlbumList';



AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'US-UK Tháng 8-2021',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/6/e/4/f6e47c87a34ee402cfffa408b49be46c.jpg',
        },
        {
            id: 2,
            name: 'Indie Việt Tháng 8-2021',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/4/5/5/e/455e8c13df444df1be1e0f827436113a.jpg',
        },
        {
            id: 3,
            name: 'Rap/Hip-Hop Tháng 8-2021',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/8/a/e/e/8aeeabaa1cef347d47395a422823393c.jpg',

        },
    ];
    return (
        <div>
            <h2>Nhạc Mới Mỗi Ngày</h2>
            <AlbumList albumList={albumList} />

        </div>
    );
}

export default AlbumFeature;