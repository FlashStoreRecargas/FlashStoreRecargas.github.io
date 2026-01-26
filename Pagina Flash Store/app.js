const CATALOGO = {
    Free: [
        { nombre: "110 💎", usd: 1.00 },
        { nombre: "220 💎", usd: 2.00 },
        { nombre: "341 💎", usd: 3.00 },
        { nombre: "572 💎", usd: 5.00 },
        { nombre: "1166 💎", usd: 10.00 },
        { nombre: "2398 💎", usd: 20.00 },
        { nombre: "6160 💎", usd: 50.00 },
        { nombre: "Paquete de Nivel 📦​​", usd: 4.00 },
        { nombre: "Tarjeta Basica 💳​", usd: 0.50 },
        { nombre: "Tarjeta Semanal 💳​", usd: 2.50 },
        { nombre: "Tarjeta Mensual 💳​", usd: 10.00 }
    ],
    Blood: [
        { nombre: "116 💰", usd: 1.00 },
        { nombre: "352 💰​", usd: 3.00 },
        { nombre: "594 💰​", usd: 5.00 },
        { nombre: "1210 💰​", usd: 10.00 },
        { nombre: "2486 💰​", usd: 20.00 },
        { nombre: "6380 💰​", usd: 50.00 },
        { nombre: "Pase Elite 📦​​", usd: 4.00 },
        { nombre: "Pase Premium 📦​", usd: 9.00 }
    ],
    Delta: [
        { nombre: "20 💸", usd: 0.30 },
        { nombre: "33 💸", usd: 0.50 },
        { nombre: "66 💸", usd: 1.00 },
        { nombre: "352 💸", usd: 4.90 },
        { nombre: "507 💸", usd: 6.80 },
        { nombre: "826 💸", usd: 9.70 },
        { nombre: "1628 💸", usd: 19.40 },
        { nombre: "2178 💸", usd: 24.30 },
        { nombre: "4346 💸", usd: 48.50 },
        { nombre: "8910 💸", usd: 97.00 },
        { nombre: "17820 💸", usd: 194.00 },
        { nombre: "26730 💸", usd: 291.00 },
        { nombre: "Suministro de Competicion 📦", usd: 0.70 },
        { nombre: "Suministro de Competicion-Avanzado 📦", usd: 2.10 }

    ],
    Roblox: [
        { nombre: "80 robux", usd: 1.00 },
        { nombre: "160 robux", usd: 2.00 },
        { nombre: "400 robux", usd: 5.00 },
        { nombre: "800 robux", usd: 10.00 },
        { nombre: "1.700 robux", usd: 20.00 },
        { nombre: "4.500 robux", usd: 50.00 },
        { nombre: "10.000 robux", usd: 100.00 },
        { nombre: "22.000 robux​", usd: 200.00 },
        { nombre: "Roblox Premium​", usd: 10.00 }
    ],
    Plataformas: [
        { nombre: "Netflix - 1 Pantalla", usd: 4.00 },
        { nombre: "Spotify Premium", usd: 6.50 },
        { nombre: "YouTube Premium", usd: 14.00 },
        { nombre: "Disney+ / Star+", usd: 7.00 },
        { nombre: "Canva Pro (Mensual)", usd: 6.50 },
        { nombre: "TikTok Coins (70)", usd: 1.20 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tasaValue').innerText = CONFIG.tasa;
    cambiarProductos(); // Carga inicial
});

function copiarTodo() {
    const info = `DATOS FLASH STORE ⚡\nBanco: 0102 Venezuela\nCI: 32187877\nTelf: 04162342319`;
    
    navigator.clipboard.writeText(info).then(() => {
        // Mostrar aviso visual
        const toast = document.createElement('div');
        toast.className = 'toast-copy';
        toast.innerText = '✅ Datos copiados al portapapeles';
        document.body.appendChild(toast);

        // Borrar aviso después de 2 segundos
        setTimeout(() => {
            toast.remove();
        }, 2000);
    });
}

function cambiarProductos() {
    const cat = document.getElementById('categoria').value;
    const prodSelect = document.getElementById('producto');
    prodSelect.innerHTML = "";

    CATALOGO[cat].forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.nombre;
        opt.setAttribute('data-precio', item.usd);
        opt.innerText = `${item.nombre} - $${item.usd.toFixed(2)}`;
        prodSelect.appendChild(opt);
    });
    calcularTotal();
}

function calcularTotal() {
    const select = document.getElementById('producto');
    const precioUSD = parseFloat(select.options[select.selectedIndex].getAttribute('data-precio'));
    const totalBs = (precioUSD * CONFIG.tasa).toLocaleString('es-VE', { minimumFractionDigits: 2 });
    document.getElementById('totalBs').innerText = totalBs;
}

function enviarWhatsApp() {
    const cat = document.getElementById('categoria').value;
    const prod = document.getElementById('producto').value;
    const id = document.getElementById('userID').value;
    const nick = document.getElementById('playerNick').value;
    const ref = document.getElementById('referencia').value;
    const total = document.getElementById('totalBs').innerText;

    if (!id || !ref) { alert("⚠️ Completa el ID y la Referencia."); return; }

    const texto = `⚡ *NUEVA COMPRA - FLASH STORE* ⚡%0A%0A` +
                  `📂 *Categoría:* ${cat}%0A` +
                  `📦 *Producto:* ${prod}%0A` +
                  `🆔 *ID/Correo:* ${id}%0A` +
                  `👤 *Nick:* ${nick}%0A` +
                  `💳 *Ref. Pago:* ${ref}%0A` +
                  `🇻🇪 *Monto:* ${total} Bs%0A%0A` +
                  `🚀 _¡Gracias por tu preferencia!_`;

    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${texto}`, '_blank');
}