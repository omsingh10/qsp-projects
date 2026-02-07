document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Time Filters
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real app, this might be a toggle. Here we simulate selection.
            btn.classList.toggle('active');
            
            // Toggle the icon color logic (just visual)
            if(btn.classList.contains('active')) {
                btn.style.backgroundColor = '#213d77';
                btn.style.color = 'white';
            } else {
                btn.style.backgroundColor = '#fbfbfb';
                btn.style.color = '#333';
            }
        });
    });

    // Simulate "Refresh" on class selection
    window.selectClass = function(element) {
        // Remove 'selected' from siblings
        const parent = element.parentElement;
        const siblings = parent.querySelectorAll('.class-box');
        siblings.forEach(sib => {
            sib.classList.remove('selected');
            // Reset content to 'Refresh' if it was simulated (for demo only)
        });

        // Add 'selected' to clicked
        element.classList.add('selected');

        // If it was a 'Refresh' box, simulate loading data
        const statusDiv = element.querySelector('.cls-status');
        if(statusDiv.classList.contains('refresh')) {
            statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
            
            setTimeout(() => {
                const random = Math.random();
                if(random > 0.5) {
                    statusDiv.innerHTML = 'AVAILABLE-00' + Math.floor(Math.random() * 50);
                    statusDiv.classList.remove('refresh');
                    statusDiv.classList.add('available');
                    statusDiv.style.color = '#2ecc71';
                    
                    // Add a price if not exists
                    if(!element.querySelector('.cls-price')) {
                        const price = document.createElement('div');
                        price.className = 'cls-price';
                        price.innerText = '₹ ' + (800 + Math.floor(Math.random() * 1000));
                        element.appendChild(price);
                    }
                    
                    // Enable the book button in this card
                    const card = element.closest('.train-card');
                    const bookBtn = card.querySelector('.btn-book');
                    bookBtn.classList.remove('disabled');
                    bookBtn.classList.add('active');

                } else {
                    statusDiv.innerHTML = 'WL ' + Math.floor(Math.random() * 20);
                    statusDiv.classList.remove('refresh');
                    statusDiv.classList.add('wl');
                    statusDiv.style.color = '#e74c3c';
                }
            }, 800);
        }
    };
});