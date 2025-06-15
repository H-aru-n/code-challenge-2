document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const input = document.getElementById("guest-name");
  const guestList = document.getElementById("guest-list");

  let guests = []

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
 // If input its empty, do nothing
    if (!name) return;
// If input is enmpty, do nothing
    if (guests.length >= 10) {
      alert("Guest limit reached! Only 10 guests allowed.");
      return;
    }

    // Create a neew guest object
    const guest = {
      id: Date.now(),// Unique ID based on timestamp
      name,
      attending: false,
      timeAdded: new Date().toLocaleTimeString()
    };

// Add guest to the array
    guests.push(guest);
    renderGuests();
    form.reset();
  });
    
  // Cleear existing list
  function renderGuests() {
    guestList.innerHTML = ""
 
    // Loop through each guest and add theeem to the DOM
    guests.forEach(guest => {
      const li = document.createElement("li");
      li.classList.add("guest-item");

// Display guest name and time addedddd
      const nameSpan = document.createElement("span");
      nameSpan.textContent = `${guest.name} (${guest.timeAdded})`
 
      // Create RSVP toggle buttooon
      const rsvpBtn = document.createElement("button");
      rsvpBtn.textContent = guest.attending ? "Attending" : "Not Attending"
      rsvpBtn.className = "rsvp-btn";
      rsvpBtn.addEventListener("click", () => {
        guest.attending = !guest.attending;
        renderGuests();
      });

      // Create remove button
      const deleteBtn = document.createElement("button")
      deleteBtn.textContent = "Remove"
      deleteBtn.className = "remove-btn";
      deleteBtn.addEventListener("click", () => {
        guests = guests.filter(g => g.id !== guest.id);
        renderGuests();
      });
      
      // Add elements to the list item
      li.append(nameSpan, rsvpBtn, deleteBtn);
      guestList.appendChild(li);
    });
  }
});
