let hellotext = document.querySelector('.hover')
let buttonRed = document.querySelector('.red');
let buttonGreen = document.querySelector('.green');
let buttonBlue = document.querySelector('.blue');
let buttonTargetText = document.querySelector('.pintar');
let colorTextBox = document.querySelector('.color-box')
let actualColor=0;
let colors = ['red','green','blue','yellow','pink']
let countBtn = document.querySelector('.count-btn')
let countText = document.querySelector('.count-text')




hellotext.addEventListener('mouseover',()=>{
    hellotext.textContent ='Bye world'
})
hellotext.addEventListener('mouseout',()=>{
    hellotext.textContent ='Hello World'
})

buttonRed.addEventListener('click',()=>{
        buttonTargetText.style.color ='red'
})
buttonGreen.addEventListener('click',()=>{
        buttonTargetText.style.color ='green'
})
buttonBlue.addEventListener('click',()=>{
        buttonTargetText.style.color ='blue'
})

colorTextBox.addEventListener('keydown',()=>{
    
    colorTextBox.style.backgroundColor = colors[actualColor];
    

    if(actualColor>=colors.length){actualColor=0};
    actualColor++;

})





