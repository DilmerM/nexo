import os

filepath = 'c:/Users/Dilmer/Desktop/Nexo/index_es.html'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

# 1. Insert favicon in the <head>
head_idx = -1
for i, line in enumerate(lines):
    if '</head>' in line:
        head_idx = i
        break

if head_idx != -1:
    lines.insert(head_idx, '    <link rel="icon" href="images/logoPestania.png" type="image/png">')

# Re-evaluate lines after insert
with open(filepath, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

# 2. Replace the countdown code
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<ul id="dynamic_countdown_pymes"' in line:
        start_idx = i
    if start_idx != -1 and '</script>' in line and i > start_idx:
        end_idx = i
        break

new_countdown = """<ul id="dynamic_countdown_pymes" class="cz_countdown clr tac" style="display: flex; justify-content: center; gap: 20px; list-style: none; padding: 0;">
    <li style="flex: 1; text-align: center;"><span id="cd_days" style="display: block; font-size: 32px; font-weight: bold; line-height: 1.2;">0</span><p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Días restantes</p></li>
    <li style="flex: 1; text-align: center;"><span id="cd_hours" style="display: block; font-size: 32px; font-weight: bold; line-height: 1.2;">0</span><p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Horas para actuar</p></li>
    <li style="flex: 1; text-align: center;"><span id="cd_mins" style="display: block; font-size: 32px; font-weight: bold; line-height: 1.2;">0</span><p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Minutos valiosos</p></li>
    <li style="flex: 1; text-align: center;"><span id="cd_secs" style="display: block; font-size: 32px; font-weight: bold; line-height: 1.2;">0</span><p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Segundos para el cambio</p></li>
</ul>
<script>
    (function(){
        function updateTimer() {
            var currentYear = new Date().getFullYear();
            var target = new Date(currentYear, 11, 31, 23, 59, 59).getTime(); // Dec 31
            var now = new Date().getTime();
            var diff = target - now;
            
            if (diff < 0) { diff = 0; }
            
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            var elDays = document.getElementById("cd_days");
            var elHours = document.getElementById("cd_hours");
            var elMins = document.getElementById("cd_mins");
            var elSecs = document.getElementById("cd_secs");
            
            if(elDays) elDays.innerText = days;
            if(elHours) elHours.innerText = hours;
            if(elMins) elMins.innerText = minutes;
            if(elSecs) elSecs.innerText = seconds;
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    })();
</script>"""

if start_idx != -1 and end_idx != -1:
    lines[start_idx] = new_countdown
    for i in range(start_idx + 1, end_idx + 1):
        lines[i] = ""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    print("Countdown replaced successfully!")
else:
    print("Could not find the countdown block.")
