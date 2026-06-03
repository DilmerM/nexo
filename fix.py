import os

filepath = 'c:/Users/Dilmer/Desktop/Nexo/index_es.html'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

# Re-insert the missing HTML div
lines[3523] = '                                                        <div class="elementor-widget-container"><div><div class="cz_title clr cz_mobile_text_center cz_title_pos_inline"><div class="cz_title_content"><div class="cz_wpe_content"><h4>¡EL MOMENTO ES AHORA!</h4><h2>TODAVÍA ESTÁS A TIEMPO DE TRANSFORMAR TU EMPRESA</h2></div></div></div></div></div></div>'

with open(filepath, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
