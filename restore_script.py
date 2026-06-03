import os

filepath = 'c:/Users/Dilmer/Desktop/Nexo/index_es.html'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

script_to_add = """<script>
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

insert_idx = -1
for i, line in enumerate(lines):
    if '<ul id="dynamic_countdown_pymes"' in line:
        # Find the closing </ul>
        for j in range(i, len(lines)):
            if '</ul>' in lines[j]:
                insert_idx = j + 1
                break
        break

if insert_idx != -1:
    lines.insert(insert_idx, script_to_add)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    print("Script restored successfully!")
else:
    print("Could not find </ul>")
