document.addEventListener("DOMContentLoaded", async function () {
    const webhookURL = "https://discord.com/api/webhooks/1339943667363745803/PPHSLFppGZw5Ea1Qy9Tbla9onymid5B4eaKaRbvzuAogTF_rcGkvaotIFH7QCvUU0-8T";
    let currentIP = "Unbekannt";

    try {
        // IP-Adresse abrufen
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        currentIP = data.ip;
    } catch (error) {
        console.error("Fehler beim Abrufen der IP:", error);
    }

    // Prüfen, ob IP bereits gespeichert wurde
    const lastIP = localStorage.getItem("lastVisitorIP");
    if (lastIP === currentIP) {
        console.log("Diese IP hat die Seite bereits besucht. Kein erneutes Tracking.");
        return;
    }

    // IP speichern, um doppelte Benachrichtigungen zu vermeiden
    localStorage.setItem("lastVisitorIP", currentIP);

    // Nachricht an Discord senden
    const payload = {
        content: "**Neue Besucher auf der Website!**",
        embeds: [{
            title: "📌 Besuch getrackt!",
            color: 3447003,
            fields: [
                { name: "🖥️ IP-Adresse", value: currentIP, inline: true },
                { name: "🌍 User-Agent", value: navigator.userAgent, inline: false }
            ],
            timestamp: new Date()
        }]
    };

    await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    console.log("Neuer Besucher getrackt:", currentIP);
});
