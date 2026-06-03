import os

filepath = 'c:/Users/Dilmer/Desktop/Nexo/index_es.html'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<ul id="dynamic_countdown_pymes"' in line:
        start_idx = i
    if start_idx != -1 and '</ul>' in line and i >= start_idx:
        end_idx = i
        break

new_ul = """<ul id="dynamic_countdown_pymes" class="cz_countdown clr tac" style="display: flex; justify-content: space-between; gap: 20px; list-style: none; padding: 0; width: 100%; margin-top: 15px;">
    <li data-aos="fade-up" data-aos-mirror="true" data-aos-delay="0" style="flex: 1; background: #ffffff; text-align: center; padding: 25px 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(92, 10, 190, 0.08); border: 1px solid rgba(92, 10, 190, 0.1);"><span id="cd_days" style="display: block; font-size: 38px; font-weight: 800; line-height: 1; color: #5c0abe;">0</span><p style="margin: 8px 0 0; font-size: 15px; font-weight: 500; opacity: 0.8; color: #333;">Días restantes</p></li>
    <li data-aos="fade-up" data-aos-mirror="true" data-aos-delay="100" style="flex: 1; background: #ffffff; text-align: center; padding: 25px 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(92, 10, 190, 0.08); border: 1px solid rgba(92, 10, 190, 0.1);"><span id="cd_hours" style="display: block; font-size: 38px; font-weight: 800; line-height: 1; color: #5c0abe;">0</span><p style="margin: 8px 0 0; font-size: 15px; font-weight: 500; opacity: 0.8; color: #333;">Horas para actuar</p></li>
    <li data-aos="fade-up" data-aos-mirror="true" data-aos-delay="200" style="flex: 1; background: #ffffff; text-align: center; padding: 25px 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(92, 10, 190, 0.08); border: 1px solid rgba(92, 10, 190, 0.1);"><span id="cd_mins" style="display: block; font-size: 38px; font-weight: 800; line-height: 1; color: #5c0abe;">0</span><p style="margin: 8px 0 0; font-size: 15px; font-weight: 500; opacity: 0.8; color: #333;">Minutos valiosos</p></li>
    <li data-aos="fade-up" data-aos-mirror="true" data-aos-delay="300" style="flex: 1; background: #ffffff; text-align: center; padding: 25px 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(92, 10, 190, 0.08); border: 1px solid rgba(92, 10, 190, 0.1);"><span id="cd_secs" style="display: block; font-size: 38px; font-weight: 800; line-height: 1; color: #5c0abe;">0</span><p style="margin: 8px 0 0; font-size: 15px; font-weight: 500; opacity: 0.8; color: #333;">Segundos para el cambio</p></li>
</ul>"""

if start_idx != -1 and end_idx != -1:
    lines[start_idx] = new_ul
    for i in range(start_idx + 1, end_idx + 1):
        lines[i] = ""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    print("UI and animation updated successfully!")
else:
    print("Could not find the target section.")
