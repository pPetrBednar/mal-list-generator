class Comic {
    constructor(title, status, chapter, rating){
        this.title = title;
        this.status = status;
        this.chapter = chapter;
        this.rating = rating;
    }

    format() {
        return `
        [quote]<br>
        [color=#ffffff]__[/color][size=125]${this.title}[/size] ${this.status}[color=#ffffff]__[/color]<br><br>
        [right][spoiler="information"]<br>
        ${this.status}[color=#ffffff]___[/color][size=75]Status[/size]<br>
        ${this.chapter}[color=#ffffff]__[/color][size=75]Chapter[/size]<br>
        ${this.rating}/10[color=#ffffff]___[/color][size=75]Rating[/size]<br>
        [/spoiler][/right]
        [/quote]<br>
        `;
    }
}

class Novel {
    constructor(title, status, volume, chapter, rating){
        this.title = title;
        this.status = status;
        this.volume = volume;
        this.chapter = chapter;
        this.rating = rating;
    }

    format() {
        return `
        [quote]<br>
        [color=#ffffff]__[/color][size=125]${this.title}[/size] ${this.status}[color=#ffffff]__[/color]<br><br>
        [right][spoiler="information"]<br>
        ${this.status}[color=#ffffff]___[/color][size=75]Status[/size]<br>
        ${this.volume}[color=#ffffff]___[/color][size=75]Volume[/size]<br>
        ${this.chapter}[color=#ffffff]__[/color][size=75]Chapter[/size]<br>
        ${this.rating}/10[color=#ffffff]___[/color][size=75]Rating[/size]<br>
        [/spoiler][/right]
        [/quote]<br>
        `;
    }
}

class Summary {
    constructor(){
        this.completed = 0;
        this.reading = 0;
        this.onhold = 0;
        this.dropped = 0;
        this.total = 0;
        this.sumRating = 0;

        this.volumes = 0;
        this.chapters = 0;
    }

    get rating() {
        return this.sumRating / this.total;
    }

    add(status, rating) {
        this[status]++;
        this.total++;
        this.sumRating += rating;
    }

    addComic(status, chapter, rating) {
        this.add(status, rating);
        this.chapters += parseInt(chapter);
    }

    addNovel(status, volume, chapter, rating) {
        this.add(status, rating);
        this.volumes += parseInt(volume);
        this.chapters += parseInt(chapter);
    }

    formatComic() {
        return `
        [quote]<br>
        Entries:[color=#ffffff]____[/color]${this.total}<br>
        Chapters:[color=#ffffff]___[/color]${this.chapters}<br><br>
        ${this.getGraph()}<br>
        ${this.getBars("reading", 1)} Reading:[color=#ffffff]_____[/color]${this.reading}<br>
        ${this.getBars("completed", 1)} Completed:[color=#ffffff]___[/color]${this.completed}<br>
        ${this.getBars("onhold", 1)} On-Hold:[color=#ffffff]_____[/color]${this.onhold}<br>
        ${this.getBars("dropped", 1)} Dropped:[color=#ffffff]_____[/color]${this.dropped}<br>
        [/quote]<br>
        `;
    }

    formatNovel() {
        return `
        [quote]<br>
        Entries:[color=#ffffff]____[/color]${this.total}<br>
        Volumes:[color=#ffffff]____[/color]${this.volumes}<br>
        Chapters:[color=#ffffff]___[/color]${this.chapters}<br><br>
        ${this.getGraph()}<br>
        ${this.getBars("reading", 1)} Reading:[color=#ffffff]_____[/color]${this.reading}<br>
        ${this.getBars("completed", 1)} Completed:[color=#ffffff]___[/color]${this.completed}<br>
        ${this.getBars("onhold", 1)} On-Hold:[color=#ffffff]_____[/color]${this.onhold}<br>
        ${this.getBars("dropped", 1)} Dropped:[color=#ffffff]_____[/color]${this.dropped}<br>
        [/quote]<br>
        `;
    }

    getGraph() {
        let out = "";
        let bars = 50;
        let barSize = this.total / bars; 
        let bReading = Math.ceil(this.reading / barSize);
        let bCompleted = Math.ceil(this.completed / barSize);
        let bOnhold = Math.ceil(this.onhold / barSize);
        let bDropped = Math.ceil(this.dropped / barSize);

        console.log(bReading);
        console.log(bCompleted);
        console.log(bOnhold);
        console.log(bDropped);

        bars -= bReading;
        if (bars < 0) {
            out += this.getBars("reading", bReading + bars);
            bars = 0;
        } else {
            out += this.getBars("reading", bReading);
        }

        bars -= bCompleted;
        if (bars < 0) {
            out += this.getBars("completed", bCompleted + bars);
            bars = 0;
        } else {
            out += this.getBars("completed", bCompleted);
        }

        bars -= bOnhold;
        if (bars < 0) {
            out += this.getBars("onhold", bOnhold + bars);
            bars = 0;
        } else {
            out += this.getBars("onhold", bOnhold);
        }

        bars -= bDropped;
        if (bars < 0) {
            out += this.getBars("dropped", bDropped + bars);
            bars = 0;
        } else {
            out += this.getBars("dropped", bDropped);
        }
        
        return out;
    }

    getBars(status, count) {
        if (count == 0) {
            return "";
        }

        let out = `[color=#${Colors[status]}]`;
        for (let i = 0; i < count; i++) {
            out += "▉";
        }
        out += "[/color]";
        return out;
    }
}

const Colors = {
    "reading":"2db039",
    "completed":"26448f",
    "dropped":"a12f31",
    "onhold":"f9d457"
}
Object.freeze(Colors);

const Status = {
    "reading":"[color=#2db039]Reading[/color]",
    "completed":"[color=#26448f]Completed[/color]",
    "dropped":"[color=#a12f31]Dropped[/color]",
    "onhold":"[color=#f9d457]On-Hold[/color]"
    };
Object.freeze(Status);