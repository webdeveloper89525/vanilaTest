"use strict";
exports.__esModule = true;
var https = require("https");
var EPISODE_API = "https://rickandmortyapi.com/api/episode";
var CHARACTER_API = "https://rickandmortyapi.com/api/character";
// SERVER FUNCTIONS
var getEpisodes = function () {
    return new Promise(function (resolve, reject) {
        https.get(EPISODE_API, function (res) {
            var data = "";
            var obj = null;
            res.on('data', function (d) {
                data += d;
            });
            res.on('end', function () {
                obj = JSON.parse(data);
                resolve(obj);
            });
        }).on("error", function (err) {
            reject(err);
        });
    });
};
var getMultipleCharacters = function (ids) {
    return new Promise(function (resolve, reject) {
        var url = CHARACTER_API + "/" + ids;
        https.get(url, function (res) {
            var data = "";
            var obj = null;
            res.on('data', function (d) {
                data += d;
            });
            res.on('end', function () {
                obj = JSON.parse(data);
                resolve(obj);
            });
        }).on("error", function (err) {
            reject(err);
        });
    });
};
var startApp = function () {
    getEpisodes().then(function (res) {
        if (res && res.results) {
            var funcs_1 = [];
            var episodes_1 = res.results;
            var episodeRes_1 = [];
            res.results.forEach(function (episode) {
                var characterurls = episode.characters;
                var characterIds = [];
                characterurls.forEach(function (url) {
                    var _a;
                    var characterId = (_a = url.split(CHARACTER_API + "/")) === null || _a === void 0 ? void 0 : _a[1];
                    characterIds.push(characterId);
                });
                funcs_1.push(getMultipleCharacters(characterIds));
            });
            Promise.all(funcs_1)
                .then(function (res) {
                if (res.length > 0) {
                    res.forEach(function (characters, index) {
                        episodeRes_1.push({
                            id: episodes_1[index].id,
                            name: episodes_1[index].name,
                            air_date: episodes_1[index].air_date,
                            episode: episodes_1[index].episode,
                            characters: characters,
                            url: episodes_1[index].url,
                            created: episodes_1[index].created
                        });
                    });
                }
                else {
                    console.log('There is no data in characters of episodes');
                }
                console.log('The result for episodes ===> ', episodeRes_1);
            })["catch"](function (err) {
                console.log('There is an error to get episodes. error: ', err);
            });
        }
        else {
            console.log('There is no data in episodes.');
        }
    })["catch"](function (err) {
        console.log('There is an error to get episodes. error: ', err);
    });
};
startApp();
