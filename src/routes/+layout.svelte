<script lang="ts">
  import "../app.css";
  import { page } from '$app/stores';
  import { colors } from '$lib/colors';
</script>

<div class="min-h-screen bg-gray-50">
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-[#2D5A27]">Artesanías Tradicionales</a>
        <a href="/buscar" class="px-4 py-2 bg-[#2D5A27] text-white rounded hover:bg-[#1F3D1B] transition-colors">
          Buscar Productos
        </a>
      </div>
    </div>
  </nav>

  <slot />

  <footer class="bg-[#2D5A27] text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-xl font-bold mb-4">Sobre Nosotros</h4>
          <p class="text-green-100">
            Promovemos y preservamos las artesanías tradicionales de Boyacá y Cundinamarca.
          </p>
        </div>
        <div>
          <h4 class="text-xl font-bold mb-4">Regiones</h4>
          <ul class="space-y-2">
            <li>
              <a href="/buscar?region=Boyacá" class="text-green-100 hover:text-white">
                Boyacá
              </a>
            </li>
            <li>
              <a href="/buscar?region=Cundinamarca" class="text-green-100 hover:text-white">
                Cundinamarca
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold mb-4">Contacto</h4>
          <p class="text-green-100">
            Email: contacto@artesanias.com<br />
            Tel: (601) 123-4567
          </p>
        </div>
      </div>
    </div>
  </footer>
</div>