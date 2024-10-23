const startTime = document.getElementById("start-time")
const endTime = document.getElementById("end-time")



let startHour = 8
let endHour = 17

populateDropDownMenu(startTime,startHour)
populateDropDownMenu(endTime,endHour)




////
function populateDropDownMenu(selctElem, selectedValue){
  

  for(let i=0; i <  24; i++){
   
    
    let optionElem = document.createElement("option");

    
    let hour = i % 12 === 0 ? 12 : i % 12;
   
    hour += ":00";
    hour += i < 12 ? "AM" : "PM"
    optionElem.value= i;
    optionElem.text= hour;
    

    if(i === selectedValue){
      console.log(selectedValue)
      optionElem.selected = true;
    }
    selctElem.appendChild(optionElem)

  }
}

startTime.addEventListener("change", function(){
  startHour = parseInt(this.value);
  createTimeTable()
})


endTime.addEventListener("change", function(){
  endHour = parseInt(this.value);
})

createTimeTable()

function createTimeTable(){
  
  const timeTable = document.getElementById("timeTable");
  
  const days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let tableHtml = `<table> <thead> <tr> <th></th>`;
             
        days.forEach (day =>{
          tableHtml += `<th>${day}</th>`
        }) 
        tableHtml += '</tr> </thead>';
        tableHtml += " <body>"
        /////////////////////
        for(let i= startHour; i <= endHour; i++){
          let hour = i % 12 === 0 ? 12 : i % 12;
   
    hour += ":00";
    hour += i < 12 ? "AM" : "PM"
          tableHtml += "<tr>"
          tableHtml += `<td class="timeLable">${hour}</td>`
          days.forEach(day =>{
            tableHtml += `<td class="time-slot"
            onclick="toggleTimeSlot(this)"
            data-day="${day}"
            data-time="${hour}"
            
            ></td>`;
          })


          tableHtml += "</tr>"
        }

        tableHtml += '</body>'

        tableHtml +='</table>';

  timeTable.innerHTML= tableHtml;
  
}


const selctedTimeSlots = new Set();

function toggleTimeSlot(tdElem){
  
  const timeSlotId = `${tdElem.dataset.day}-${tdElem.dataset.time}`;

  if(selctedTimeSlots.has(timeSlotId)){
    
    selctedTimeSlots.delete(timeSlotId);
    tdElem.classList.remove("selected");
  }else{
    selctedTimeSlots.add(timeSlotId)
    tdElem.classList.add("selected")
  }

}

submitMeetingBtn = document.getElementById("submitMeeting");
submitMeetingBtn.addEventListener("click",async function(){
  const userName = document.getElementById("user-name").value;
  const eventName =document.getElementById("event-name").value

  if(!userName || !eventName){
    alert("Please enter your name and envent name")
    return
  };

  const bodyPayLoad = {
    userName : userName,
    eventName : eventName,
    slot : [...selctedTimeSlots]
  }
  const API_URL = 'https://jsonplaceholder.typicode.com/posts'

  const response = await fetch(API_URL,{
    method : 'POST',
    body : JSON.stringify(bodyPayLoad),
    headers:{
      'Content-type': 'application/json'
    }
    
  });
  const data= await response.json();
  console.log('We got this  back from the server')
  console.log(data)
})

