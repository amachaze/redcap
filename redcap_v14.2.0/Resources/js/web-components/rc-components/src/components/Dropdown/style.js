const style = `
:host {
    --height: 40px;
}
nav ul {
	padding: 0;
  margin: 0;
	list-style: none;
	position: relative;
	}
	
nav ul li {
	display:inline-block;
	background-color: #E64A19;
	}

nav a {
	display:block;
	padding:0 10px;	
	color:#FFF;
	font-size:20px;
	line-height:  var(--height);
	text-decoration:none;
}

nav a:hover { 
	background-color: #000000; 
}

/* Hide Dropdowns by Default */
nav ul ul {
	display: none;
	position: absolute; 
	top:  var(--height); /* the height of the main nav */
}
	
/* Display Dropdowns on Hover */
nav ul li:hover > ul {
	display:inherit;
}
	
/* Fisrt Tier Dropdown */
nav ul ul li {
	width:170px;
	float:none;
	display:list-item;
	position: relative;
}

/* Second, Third and more Tiers	*/
nav ul ul ul li {
	position: relative;
	top: -var(--height); 
	left:170px;
}

	
/* Change this in order to change the Dropdown symbol */
li > a:after { content:  ' +'; }
li > a:only-child:after { content: ''; }
`

export default style