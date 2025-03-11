self.addEventListener("push", function(event) {
    const data = event.data.json(); // Get the notification payload

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/logo.png",  // Change this to your icon
    });
});
