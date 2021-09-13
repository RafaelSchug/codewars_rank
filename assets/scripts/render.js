const list = document.querySelector('#list');
const loading = document.querySelector('.loading__container');
       
users.forEach(item => {
    fetch(item.api_request).then(res => res.json()).then(data => item.pontuacao = data.honor);
})

const listUsers = () => {
    const checkStatus = users.every(item => item.pontuacao > -1);

    if(!checkStatus){
        setTimeout(()=> listUsers(), 100);
    } else {
        loading.style.display = 'none';
        list.style.display = 'initial';
        renderElements();
    } 
}

const renderElements = () => {

    let timer = 100;

    users = Object.values(users).sort((a, b) => b.pontuacao - a.pontuacao);
    users.forEach((item, index)=>{
        const li = document.createElement('li');

        li.innerHTML = `<span class='position'>${index+1}º</span><span><a target='_blank' href='${item.perfil}'>${item.nome}</a></span><span class='points'><strong>${item.pontuacao}</strong></span>`
        list.appendChild(li);              
    })

    let liElements = document.querySelectorAll('li');
    
    liElements.forEach(li => {
        setTimeout(()=> {
            li.style.opacity = 1;
        }, timer+=130)
    })
}

    
setTimeout(()=>{
    listUsers();
}, 2000)