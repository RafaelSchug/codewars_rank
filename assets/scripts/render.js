const list = document.querySelector('#list');
const loading = document.querySelector('.loading__container');

const getData = async () => {

    await Promise.all(
        users.map(async item => {
            await fetch(item.api_request)
                .then(res => res.json())
                .then(res => item.pontuacao = res.honor)
        })
    ).then(() => renderElementsByPoints());

}

const renderElementsByPoints = () => {

    loading.style.display = 'none';
    list.style.display = 'initial';

    users = Object.values(users).sort((a, b) => b.pontuacao - a.pontuacao);

    let opacityDelay = 100;

    users.forEach((item, index)=>{

        const li = document.createElement('li');
        const spanPosition = document.createElement('span');
        const spanName = document.createElement('span');
        const spanPoints = document.createElement('span');

        spanPosition.className = 'user-position';
        spanPosition.innerText = `${index + 1}º`;
        spanName.innerHTML = `<a target='_blank' href='${item.perfil}'>${item.nome}</a>`;
        spanPoints.className = 'user-points';
        spanPoints.innerHTML = `<strong>${item.pontuacao}</strong>`;

        li.append(spanPosition, spanName, spanPoints);
        list.append(li); 
        
        setTimeout(()=> {
            li.style.opacity = 1;
        }, opacityDelay += 130);
        
    })
    
}

window.onload = setTimeout(()=>{
    getData();
}, 2000);