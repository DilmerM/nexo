import os

filepath = 'c:/Users/Dilmer/Desktop/Nexo/index_es.html'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

new_content = """<ul id="dynamic_countdown_pymes" class="cz_countdown clr tac">
    <li><span>0</span><p>Días restantes</p></li>
    <li><span>0</span><p>Horas para actuar</p></li>
    <li><span>0</span><p>Minutos valiosos</p></li>
    <li><span>0</span><p>Segundos para el cambio</p></li>
</ul>
<script>
    (function(){
        var currentYear = new Date().getFullYear();
        var el = document.getElementById("dynamic_countdown_pymes");
        if(el) {
            var config = {
                "type": "regular",
                "date": currentYear + "/12/31 23:59:59",
                "elapse": false,
                "y": "",
                "d": "Días restantes",
                "h": "Horas para actuar",
                "m": "Minutos valiosos",
                "s": "Segundos para el cambio",
                "p": "",
                "ex": "¡El momento ha llegado!"
            };
            el.setAttribute("data-countdown", JSON.stringify(config));
        }
    })();
</script>"""

# Find line index of <ul data-countdown="{&quot;type&quot;:&quot;loop&quot;
start_idx = -1
for i, line in enumerate(lines):
    if '<ul data-countdown="{' in line and 'type' in line and 'loop' in line:
        start_idx = i
        break

if start_idx != -1:
    lines[start_idx] = new_content
    for i in range(start_idx + 1, start_idx + 15):
        lines[i] = ""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    print("Replaced!")
else:
    print("Not found.")
