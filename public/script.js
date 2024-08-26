let formData = {};

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        mobile: document.getElementById("mobile").value,
        addressType: document.getElementById("perma").checked ? "Permanent" : "Communication",
        dob: document.getElementById("dob").value,
        occupation: document.getElementById("occupation").value,
        password: document.getElementById("password").value
    };

    // Display the form data in the review modal (Assuming a review modal structure is similar to the one you initially described)
    document.getElementById("reviewModalBody").innerHTML = `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Mobile:</strong> ${formData.mobile}</p>
        <p><strong>Address Type:</strong> ${formData.addressType}</p>
        <p><strong>Date of Birth:</strong> ${formData.dob}</p>
        <p><strong>Occupation:</strong> ${formData.occupation}</p>
    `;

    // Close the sign-up modal and open the review modal
    const signUpModalElement = document.querySelector('#signUpModal');
    const signUpModalInstance = bootstrap.Modal.getInstance(signUpModalElement);
    signUpModalInstance.hide();

    const reviewModalElement = document.querySelector('#reviewModal');
    const reviewModalInstance = new bootstrap.Modal(reviewModalElement);
    reviewModalInstance.show();
}

function editForm() {
    // Close the review modal and reopen the sign-up modal
    const reviewModalElement = document.querySelector('#reviewModal');
    const reviewModalInstance = bootstrap.Modal.getInstance(reviewModalElement);
    reviewModalInstance.hide();

    const signUpModalElement = document.querySelector('#signUpModal');
    const signUpModalInstance = new bootstrap.Modal(signUpModalElement);
    signUpModalInstance.show();
}

function finalSubmit() {
    // Send the form data to the server using Fetch API
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(message => {
        // Display a success message to the user
        document.getElementById("messageDisplay").innerHTML = message;

        // Close the review modal
        const reviewModalElement = document.querySelector('#reviewModal');
        const reviewModalInstance = bootstrap.Modal.getInstance(reviewModalElement);
        reviewModalInstance.hide();

        // Reset the form data
        formData = {};
        document.getElementById("signup-form").reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("messageDisplay").innerHTML = "There was an error submitting your data.";
    });
}
