/**
 * Created by huangjiankun on 2018/7/10.
 */
import './css/index.css'
import './less/a.less'
import {a} from './js/a.js'
console.log(a);
var oRoot = document.querySelector('#root')
oRoot.innerHTML = 'hello webpackjasd';

// console.log($('.less'))
// $('.less').css({
// 	'width': '100px',
// 	'height':'100px',
// 	'background':'red',
// })