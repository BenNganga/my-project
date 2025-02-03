// script.js
function captureLicensePlate() {
    return "KBY 123X"; // Simulated LPR system
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("plateNumber").innerText = "License Plate: " + captureLicensePlate();
});

function generateTicket() {
    let plateNumber = captureLicensePlate();
    let ticketNumber = Math.floor(Math.random() * 1000000);
    let parkingSpot = "P-" + (Math.floor(Math.random() * 100) + 1);
    let time = new Date().toLocaleTimeString();
    
    document.getElementById("ticketDetails").style.display = "block";
    document.getElementById("ticketDetails").innerHTML = `<p><strong>Ticket Number:</strong> ${ticketNumber}</p><p><strong>Assigned Spot:</strong> ${parkingSpot}</p>`;
    
    let table = document.getElementById("parkingRecords");
    let row = table.insertRow();
    row.insertCell(0).innerText = plateNumber;
    row.insertCell(1).innerText = ticketNumber;
    row.insertCell(2).innerText = parkingSpot;
    row.insertCell(3).innerText = time;
}
