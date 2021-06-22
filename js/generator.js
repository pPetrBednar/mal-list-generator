function onLoad() {
    var comics = new Array();
    var novels = new Array();

    var comicSummary = new Summary();
    var items = comic.split("|");
    items.forEach(item => {
        let itemData = item.split(";");
        comics.push(new Comic(itemData[0], Status[itemData[1].trim()], itemData[2], itemData[3]));
        comicSummary.addComic(itemData[1].trim(), itemData[2], itemData[3]);
    });

    var novelSummary = new Summary();
    var items = novel.split("|");
    items.forEach(item => {
        let itemData = item.split(";");
        novels.push(new Novel(itemData[0], Status[itemData[1].trim()], itemData[2], itemData[3], itemData[4]));
        novelSummary.addNovel(itemData[1].trim(), itemData[2], itemData[3], itemData[4]);
    });

    // Info
    document.write(`
    <br>
    [quote]<br>
    [size=200][color=#ffffff]__[/color]Webtoon/Manhwa/Manhua[/size]<br><br>`);

    // Comic Summary
    document.write(comicSummary.formatComic());

    // Comic List
    document.write(`
    [spoiler=list]<br>
    `);

    comics.forEach(e => {
        document.write(e.format());
    });

    // /Comic List
    document.write(`
    [/spoiler]`);

    // Info
    document.write(`
    [/quote]<br>
    [quote]<br>
    [size=200][color=#ffffff]__[/color]Novel/Webnovel/Lightnovel[/size]<br><br>`);

    // Novel Summary
    document.write(novelSummary.formatNovel());

    // Novel List
    document.write(`
    [spoiler=list]<br>
    `);

    novels.forEach(e => {
        document.write(e.format());
    });

    // /Novel List
    document.write(`
    [/spoiler]`);

    // Footer
    document.write(`
    [/quote]<br>
    [right][spoiler="information"]<br>
    Generated via tool.<br>
    Created by [url=https://myanimelist.net/profile/Petrexis]Petrexis[/url].<br>
    Code on [url=https://github.com/pPetrBednar/mal-list-generator]Github[/url].<br>
    [/spoiler][/right]`);
}