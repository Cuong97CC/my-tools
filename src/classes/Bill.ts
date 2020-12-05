import { parseNumberString } from '../app/_helpers/function';

export class Bill {
    no_set = [];
    _cost: number;
    _date: Date;
    _time: Date;
    tag: string;
    details: string;
    _id: any;

    constructor(object) {
        if (object) {
            for (let key in object) {
                if (!this.no_set.includes(key)) this[key] = object[key];
            }
        }
    }

    get cost() {
        return this._cost ? this._cost.toLocaleString('en') : '';
    }

    set cost(value) {
        let val = parseNumberString(value);
        if (val < 0) val = 0;
        this._cost = val;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = new Date(value);
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = new Date(value);
    }

    get submit_data() {
        return {
            tag: this.tag,
            details: this.details,
            cost: this._cost,
            time: this._date
        }
    }
}
