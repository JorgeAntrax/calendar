const
    $calendarTPL = `
		<div class="calendar is-primary">
			<div class="calendar-controls">
				<div class="calendar-control-month">
					<span class="calendar-control-item control-prev"><i class="fa fa-angle-up"></i></span>
					<span class="calendar-label-control"></span>
					<span class="calendar-control-item control-next"><i class="fa fa-angle-down"></i></span>
				</div>
				<span class="calendar-label">10</span>
				<div class="calendar-control-year">
					<span class="calendar-control-item control-prev"><i class="fa fa-angle-up"></i></span>
					<span class="calendar-label-control">2018</span>
					<span class="calendar-control-item control-next"><i class="fa fa-angle-down"></i></span>
				</div>
			</div>
			<div class="calendar-grid">
			<span class="label-grid-days">d</span>
			<span class="label-grid-days">l</span>
			<span class="label-grid-days">m</span>
			<span class="label-grid-days">mi</span>
			<span class="label-grid-days">j</span>
			<span class="label-grid-days">v</span>
			<span class="label-grid-days">s</span>
			</div>
		</div>
	`;

class kmCalendar {
    constructor(o) {
        this.id = o.el;
        this.el = document.querySelector(this.id);
        this.value = o.value.split('/');
        this.el.innerHTML += $calendarTPL;
        this.input = this.el.querySelector('.input');
        this.labelMonth = this.el.querySelector('.calendar-control-month .calendar-label-control');
        this.labelYear = this.el.querySelector('.calendar-control-year .calendar-label-control');

        this.init();
    }

    // the init method initialized the class instance

    init() {
        kmCalendar.setDay(parseInt(this.value[0]));
        kmCalendar.setMonth(parseInt(this.value[1]));
        kmCalendar.setYear(parseInt(this.value[2]));
        kmCalendar.updateInput(this.input);
        kmCalendar.updateMonth(this.labelMonth);
        kmCalendar.updateYear(this.labelYear);

        kmCalendar.buildCalendar(this.el);

        this.watchInput();
        this.watchMonths();
        this.watchYear();
    }

    static buildCalendar(el) {
        var el = el;
        let
            fecha = new Date(),
            grid = el.querySelector('.calendar-grid'),
            mes = kmCalendar.getMonth - 1,
            anio = kmCalendar.getYear,
            forMes = 0,
            clear;

        fecha.setFullYear(anio, mes, 1);
        var day = fecha.getDay();

        if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
            forMes = 31;
        } else if (mes == 1) {
            forMes = 28;
        } else {
            forMes = 30;
        }

        clear = grid.querySelectorAll('button');
        clear.forEach(btn => {
            btn.remove();
        });

        for (let index = 1; index <= forMes; index++) {
            let btn = document.createElement('button');
            btn.classList.add('is-rounded');
            if (index == kmCalendar.getDay) {
                btn.classList.add('is-active');
            }
            if (index < 10) {
                btn.innerText = '0' + index;
            } else {
                btn.innerText = index;
            }
            grid.appendChild(btn);
        }

        grid.querySelector('button:first-of-type').style.gridColumnStart = day + 1;
        kmCalendar.watchCalendar(el);

        //var dias = ['D', 'L', 'M', 'MI', 'J', 'V', 'S'];
    }

    watchInput() {
        let $input = this.el.querySelector('.input');
        var el = this.el;
        $input.addEventListener('focus', function() {
            el.querySelector('.calendar').classList.remove('is-hidden');
        }, false);
    }

    static watchCalendar(el) {
        var
            $calendarBtn = el.querySelectorAll('.calendar-grid button'),
            $label = el.querySelector('.calendar-label'),
            $input = el.querySelector('.input');

        $calendarBtn.forEach(button => {
            button.addEventListener('click', () => {
                $calendarBtn.forEach(btn => {
                    btn.classList.remove('is-active');
                });
                button.classList.add('is-active');
                kmCalendar.setDay(button.outerText);
                kmCalendar.updateLabel($label);
                kmCalendar.updateInput($input);
            }, false);
        });
    }

    watchMonths() {
        let $controls = this.el.querySelectorAll('.calendar-control-month .calendar-control-item');

        $controls.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('control-next')) {
                    kmCalendar.setMonth(kmCalendar.getMonth == 12 ? 1 : kmCalendar.getMonth + 1);
                } else if (btn.classList.contains('control-prev')) {
                    kmCalendar.setMonth(kmCalendar.getMonth == 1 ? 12 : kmCalendar.getMonth - 1);
                }
                kmCalendar.updateInput(this.input);
                kmCalendar.updateMonth(this.labelMonth);
                kmCalendar.buildCalendar(this.el);
            }, this);
        });
    }

    watchYear() {
        let $controls = this.el.querySelectorAll('.calendar-control-year .calendar-control-item');

        $controls.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('control-next')) {
                    kmCalendar.setYear(kmCalendar.getYear == 1900 ? date.now() : kmCalendar.getYear + 1);
                } else if (btn.classList.contains('control-prev')) {
                    kmCalendar.setYear(kmCalendar.getYear == 3000 ? date.now() : kmCalendar.getYear - 1);
                }
                kmCalendar.updateInput(this.input);
                kmCalendar.updateYear(this.labelYear);
                kmCalendar.buildCalendar(this.el);
            }, this);
        });
    }

    static get getDay() {
        return this.day;
    }

    static setDay(value) {
        this.day = value;
    }
    static get getMonth() {
        return this.month;
    }

    static setMonth(value) {
        this.month = value;
    }

    static get getYear() {
        return this.year;
    }

    static setYear(value) {
        this.year = value;
    }

    static updateLabel(el) {
        el.innerHTML = this.getDay;
    }

    static updateInput(el) {
        el.value = `${this.getDay}/${this.getMonth}/${this.getYear}`;
    }

    static updateMonth(el) {
        let $meses = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        el.innerHTML = $meses[kmCalendar.getMonth];
    }

    static updateYear(el) {
        el.innerHTML = kmCalendar.getYear;
    }
}