/*
new nhn.mobile.search.searchMusicWithLyrics.Controller(jQuery("._cs_music_lyrics"), {
                                "ajaxSetting": {
                                    "url": "https://m.search.naver.com/p/csearch/content/qapirender.nhn",
                                    "data": {
                                        "where": "m",
                                        "key": "LyricsSearchResult",
                                        "pkid": "519",
                                        "u1": 1,
                                        "u2": 3,
                                        "u3": "0",
                                        "u4": "1",
                                        "q": "가사검색 하얀 빛이 날 부르고 있어"
                                    }
                                },
                                "queryPrefix": "가사검색",
                                "persistKey": "au_music_lyrics"
                            }).on({

                                ==> https://m.search.naver.com/p/csearch/content/qapirender.nhn?where=m&key=LyricsSearchResult&pkid=519&u1=1&u2=3&u3=0&u4=1&q=가사검색%20하얀%빛이%날%부르고%20있어
*/
const axios = require('axios');

const serachMusicWithLyrics = async (query) => {
    try {
        const response = await axios.get('https://m.search.naver.com/p/csearch/content/qapirender.nhn', {
            params: {
                where: 'm',
                key: 'LyricsSearchResult',
                pkid: '519',
                u1: 1,
                u2: 3,
                u3: '0',
                u4: '1',
                q: '가사검색 ' + query
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

};

serachMusicWithLyrics("하얀 빛이 날 감싸고")