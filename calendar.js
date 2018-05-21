'use strict';


class kmCalendar {
    constructor(o) {
        this.el = document.querySelector(o.el);
        this.el.innerHTML = `
				<input type="text" class="input" name="${o.inputName}" id="${o.inputId}">
				<div class="calendar">
					<div class="calendar-controls">
						<div class="calendar-control-month">
							<span class="calendar-control-item control-prev"><i class="${o.classIconPrev}"></i></span>
							<span class="calendar-label-control"></span>
							<span class="calendar-control-item control-next"><i class="${o.classIconNext}"></i></span>
						</div>
						<span class="calendar-label"></span>
						<div class="calendar-control-year">
							<span class="calendar-control-item control-prev"><i class="${o.classIconPrev}"></i></span>
							<span class="calendar-label-control"></span>
							<span class="calendar-control-item control-next"><i class="${o.classIconNext}"></i></span>
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
        this.value = o.value.split('/');
        this.input = this.el.querySelector('.input');
        this.labelMonth = this.el.querySelector('.calendar-control-month .calendar-label-control');
        this.labelYear = this.el.querySelector('.calendar-control-year .calendar-label-control');
        this.controlsMonth = this.el.querySelectorAll('.calendar-control-month .calendar-control-item');
        this.controlsYear = this.el.querySelectorAll('.calendar-control-year .calendar-control-item');
        this.grid = this.el.querySelector('.calendar-grid');
        this.label = this.el.querySelector('.calendar-label');
        this.init();
    }


    init() {
        kmCalendar.setDay(parseInt(this.value[0]));
        kmCalendar.setMonth(parseInt(this.value[1]));
        kmCalendar.setYear(parseInt(this.value[2]));
        kmCalendar.buildCalendar(this.el, this.grid, this.label, this.input);
        kmCalendar.updateInput(this.input);
        kmCalendar.updateMonth(this.labelMonth);
        kmCalendar.updateYear(this.labelYear);

        this.watchInput(this.el, this.input);
        this.watchMonths(this.controlsMonth);
        this.watchYear(this.controlsYear);
    }

    static buildCalendar(el, grid, label, input) {
        let
            fecha = new Date(),
            mes = kmCalendar.getMonth - 1,
            anio = kmCalendar.getYear,
            forMes = 0,
            calendar = grid.parentElement,
            buttons, day, index, btn;

        fecha.setFullYear(anio, mes, 1);
        day = fecha.getDay();

        if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
            forMes = 31;
        } else if (mes == 1) {
            forMes = 28;
        } else {
            forMes = 30;
        }

        if (buttons != undefined) {
            buttons.forEach(btn => {
                btn.remove();
            });
        }

        kmCalendar.updateLabel(label);
        for (index = 1; index <= forMes; index++) {
            btn = document.createElement('button');
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
        buttons = grid.querySelectorAll('button');
        buttons[0].style.gridColumnStart = day + 1;
        kmCalendar.watchCalendar(el, label, buttons, input, calendar);
    }

    watchInput(el, input) {
        input.addEventListener('click', function() {
            el.querySelector('.calendar').classList.toggle('is-visible');
        }, false);
    }

    static watchCalendar(el, label, buttons, input, calendar) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(btn => {
                    btn.classList.remove('is-active');
                });
                btn.classList.add('is-active');
                kmCalendar.setDay(btn.outerText);
                kmCalendar.updateLabel(label);
                kmCalendar.updateInput(input);
                calendar.classList.remove('is-visible');
            }, false);
        });
    }

    watchMonths(controls) {
        controls.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('control-next')) {
                    kmCalendar.setMonth(kmCalendar.getMonth == 12 ? 1 : kmCalendar.getMonth + 1);
                } else if (btn.classList.contains('control-prev')) {
                    kmCalendar.setMonth(kmCalendar.getMonth == 1 ? 12 : kmCalendar.getMonth - 1);
                }
                kmCalendar.updateInput(this.input);
                kmCalendar.updateMonth(this.labelMonth);
                kmCalendar.buildCalendar(this.el, this.grid, this.label, this.input);
            }, this);
        });
    }

    watchYear(controls) {
        controls.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('control-next')) {
                    kmCalendar.setYear(kmCalendar.getYear + 1);
                } else if (btn.classList.contains('control-prev')) {
                    kmCalendar.setYear(kmCalendar.getYear - 1);
                }
                kmCalendar.updateInput(this.input);
                kmCalendar.updateYear(this.labelYear);
                kmCalendar.buildCalendar(this.el, this.grid, this.label, this.input);
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