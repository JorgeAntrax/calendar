'use strict';
/* 
	the class kmCalendar create a calendar picker and added listener for controls of calendar
	@params
	object o {
		el: '#demo', // the Id container with class calendar-picker
		languaje: 'es | us', languaje for calendar component
    value: '20/2/2018', //default value calendar with the next format:  d/m/yyyy
    inputName: 'namedemo', // the name attribute for control input
    inputId: 'input123', // the id for control input
    style: 'danger', // style for the calendar
    classIconPrev: 'fa fa-angle-up', // the classes for the icon previus control
    classIconNext: 'fa fa-angle-down', // the classess for the icon next control
    classIconInput: 'fa fa-calendar', // classes for de icon toggle calendar
    iconPosition: 'left' // icon toggle position
	}
*/
class kmCalendar {
    // create a template calendar and cached components
    constructor(o) {
        this.el = document.querySelector(o.el);
        this.el.innerHTML = `
				<field>
					<control class="is-icon-${o.iconPosition}">
						<input type="text" class="input is-${o.style}" name="${o.inputName}" id="${o.inputId}">
						<icon class="toggle-calendar"><i class="${o.classIconInput}"></i></icon>
					</control>
				</field>
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
						<span class="label-grid-days">${o.languaje != 'es' ? 'su' : 'd'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'm' : 'l'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'tu' : 'm'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'we' : 'mi'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'th' : 'j'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'f' : 'v'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'sa' : 's'}</span>
					</div>
				</div>
			`;
        this.el.classList.add('is-' + o.style);
        this.value = o.value.split('/');
        this.input = this.el.querySelector('.input');
        this.toggle = this.el.querySelector('.toggle-calendar');
        this.labelMonth = this.el.querySelector('.calendar-control-month .calendar-label-control');
        this.labelYear = this.el.querySelector('.calendar-control-year .calendar-label-control');
        this.controlsMonth = this.el.querySelectorAll('.calendar-control-month .calendar-control-item');
        this.controlsYear = this.el.querySelectorAll('.calendar-control-year .calendar-control-item');
        this.grid = this.el.querySelector('.calendar-grid');
        this.label = this.el.querySelector('.calendar-label');
        this.init();
    }

    //this method configure all calendar parameters
    init() {
        this
        kmCalendar.setDay(parseInt(this.value[0]));
        kmCalendar.setMonth(parseInt(this.value[1]));
        kmCalendar.setYear(parseInt(this.value[2]));
        kmCalendar.buildCalendar(this.el, this.grid, this.label, this.input);

        this.watchInput(this.el, this.toggle);
        this.watchMonths(this.controlsMonth);
        this.watchYear(this.controlsYear);
        kmCalendar.updateInput(this.input);
        kmCalendar.updateMonth(this.labelMonth);
        kmCalendar.updateYear(this.labelYear);
    }

    //this static method build the calendar using native class date()
    static buildCalendar(el, grid, label, input) {
        let
            fecha = new Date(),
            mes = kmCalendar.getMonth - 1,
            anio = kmCalendar.getYear,
            forMes = 0,
            calendar = grid.parentElement,
            buttons = grid.querySelectorAll('button'),
            day, index, btn;

        fecha.setFullYear(anio, mes, 1);
        day = fecha.getDay();

        if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
            forMes = 31;
        } else if (mes == 1) {
            forMes = 28;
        } else {
            forMes = 30;
        }


        kmCalendar.updateLabel(label);

        if (buttons !== undefined) {
            buttons.forEach(btn => {
                btn.remove();
            });
        }

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
        kmCalendar.watchCalendar(label, buttons, input, calendar);
    }

    //this method add the event click for the icon toggle
    /* 
    	@params
    	el: parent calendar container with class contains .calendar
    	toggle: element toggle for calendar component
    */
    watchInput(el, toggle) {
        toggle.addEventListener('click', function() {
            el.querySelector('.calendar').classList.toggle('is-visible');
        }, false);
    }

    //this static method add event click for all buttons in to calendar-grid container
    /*
    	@params
			label: the element selector is .calendar-label
			buttons: array with total buttons into grid container
			input: the element control input for update content
			calendar: the calendar container for toggle visibility
    */
    static watchCalendar(label, buttons, input, calendar) {
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

    // this method  added events click for a control months and update calendar.
    /*
    	@párams
    	controls: [array] all elements with class contains .calendar-control-item into .calenar-control-month
    */

    watchMonths(controls) {
        controls.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('control-next')) {
                    kmCalendar.setMonth(kmCalendar.getMonth >= 12 ? 1 : kmCalendar.getMonth + 1);
                } else if (btn.classList.contains('control-prev')) {
                    kmCalendar.setMonth(kmCalendar.getMonth <= 1 ? 12 : kmCalendar.getMonth - 1);
                }
                kmCalendar.updateInput(this.input);
                kmCalendar.updateMonth(this.labelMonth);
                kmCalendar.buildCalendar(this.el, this.grid, this.label, this.input);
            }, this);
        });
    }

    // this method  added events click for a control years and update calendar.
    /*
    	@párams
    	controls: [array] all elements with class contains .calendar-control-item into .calenar-control-year
    */

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

    // this method return day

    static get getDay() {
        return this.day;
    }

    // this method update day

    static setDay(value) {
        this.day = value;
    }

    //this method return month

    static get getMonth() {
        return this.month;
    }

    //this method update month

    static setMonth(value) {
        this.month = value;
    }

    // this method return year

    static get getYear() {
        return this.year;
    }

    //this method update year

    static setYear(value) {
        this.year = value;
    }

    //this method update the label day

    static updateLabel(el) {
        el.innerHTML = this.getDay;
    }

    //this method update content input control

    static updateInput(el) {
        el.value = `${this.getDay}/${this.getMonth}/${this.getYear}`;
    }

    //this method update month

    static updateMonth(el) {
        let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        if (kmCalendar.languaje != 'es') {
            meses[0] = 'jan';
            meses[11] = 'dec';
        }
        el.innerHTML = meses[kmCalendar.getMonth - 1];
    }

    // this method update year

    static updateYear(el) {
        el.innerHTML = kmCalendar.getYear;
    }
}