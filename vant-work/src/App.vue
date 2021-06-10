<template>
   <router-view></router-view>
</template>
<script>
export default {
  name: 'App',
 }
</script>
<style>
/* Normalizes margin,padding */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,p,blockquote,th,td { margin:0;padding:0}
/* Normalizes font-size for headers */
h1,h2,h3,h4,h5,h6 { font-size:100%}
/* Removes list-style from lists */
ol,ul { list-style:none }
/* Normalizes font-size and font-weight to normal */
address,caption,cite,code,dfn,em,strong,th,var { font-size:normal; font-weight:normal }
/* Removes list-style from lists */
table { border-collapse:collapse; border-spacing:0 }
/* Removes border from fieldset and img */
fieldset,img { border:0 }
/* Left-aligns text in caption and th */
caption,th { text-align:left }
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
margin: 0;
padding: 0;
border: 0;
outline: 0;
font-size: 100%;
vertical-align: baseline;
background: transparent;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: ”;
content: none;
}
/* remember to define focus styles! */
:focus {
outline: 0;
}
/* remember to highlight inserts somehow! */
ins {
text-decoration: none;
}
del {
text-decoration: line-through;
}
/* tables still need ‘cellspacing=”0″‘ in the markup */
table {
border-collapse: collapse;
border-spacing: 0;
}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td {
margin:0;
padding:0;
}
table {
border-collapse:collapse;
border-spacing:0;
}
fieldset,img {
border:0;
}
button{
   border: 1px solid #ddd;
}

address,caption,cite,code,dfn,em,strong,th,var {
font-style:normal;
font-weight:normal;
}
ol,ul {
list-style:none;
}
caption,th {
text-align:left;
}
h1,h2,h3,h4,h5,h6 {
font-size:100%;
font-weight:normal;
}
q:before,q:after {
content:”;
}
abbr,acronym { 
border:0;
}
/* 返回按钮 */
.Return {
  /* position: absolute; */
  left: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}

.Return:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
