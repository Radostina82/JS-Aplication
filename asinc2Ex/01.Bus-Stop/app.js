async function getInfo() {
const stopId = document.getElementById('stopId').value;
const stopName = document.getElementById('stopName');
const timeTableElement = document.getElementById('buses');
const button = document.getElementById('submit');
const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    
    try{

        stopName.textContent = 'Loading...';
        timeTableElement.replaceChildren();
        button.disabled = true;
        const res = await fetch(url);
        if(res.status != 200){
            throw new Error('Stop ID not found');
        }
        const data = await res.json();
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(b=>{
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableElement.appendChild(liElement);
        });
        
    }catch(error){
        stopName.textContent = 'Error';
    }
    button.disabled = false;
}