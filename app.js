var app = new kmCalendar({
    el: '#demo', // Id del contenedor calendar-picker
    value: '10/4/2018', // valor inicial del calendario
    inputName: '', // atributo name para el elemento input
    inputId: '', // id para el elemento input
    style: 'primary', // estilo del calendario : primary, info, success, warning, danger
    classIconPrev: 'fa fa-caret-up', // icono que se visualiza al cambiar al mes o año anterior
    classIconNext: 'fa fa-caret-down', // icono que se visualiza al cambiar al mes o año siguiente
    classIconInput: 'fa fa-calendar', // icono posicionado aun lado del input el cual hace toggle en el calendario
    iconPosition: 'left' //posicion el icono que hace toggle en el calendario
});
var app1 = new kmCalendar({
    el: '#demo1',
    value: '01/11/2018',
    inputName: '',
    inputId: '',
    style: 'info',
    classIconPrev: 'fa fa-angle-up',
    classIconNext: 'fa fa-angle-down',
    classIconInput: 'fa fa-calendar',
    iconPosition: 'right'
});
var app2 = new kmCalendar({
    el: '#demo2',
    value: '10/5/2018',
    inputName: '',
    inputId: '',
    style: 'success',
    classIconPrev: 'fa fa-angle-up',
    classIconNext: 'fa fa-angle-down',
    classIconInput: 'fa fa-calendar',
    iconPosition: 'left'
});
var app3 = new kmCalendar({
    el: '#demo3',
    value: '15/8/2018',
    inputName: '',
    inputId: '',
    style: 'warning',
    classIconPrev: 'fa fa-angle-up',
    classIconNext: 'fa fa-angle-down',
    classIconInput: 'fa fa-calendar',
    iconPosition: 'right'
});
var app4 = new kmCalendar({
    el: '#demo4',
    value: '20/2/2018',
    inputName: 'namedemo',
    inputId: 'input123',
    style: 'danger',
    classIconPrev: 'fa fa-angle-up',
    classIconNext: 'fa fa-angle-down',
    classIconInput: 'fa fa-calendar',
    iconPosition: 'left'
});