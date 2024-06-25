<script>
    let mouseX = 0;
    let mouseY = 0;
  
    // Function to handle mousemove events
    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  
    // Function to handle drag events
    function handleDrag(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  </script>
  

  
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="draggable" 
    draggable="true" 
    on:drag={handleDrag}>
  </div>
  
  <div class="info">
    Mouse position: {mouseX}, {mouseY}
  </div>
  
  <!-- Ensure window mousemove events are tracked -->
  <svelte:window on:mousemove={handleMouseMove} />

  <style>
    .draggable {
      width: 100px;
      height: 100px;
      background-color: red;
      cursor: grab;
    }
  
    .info {
      margin-top: 20px;
      font-size: 20px;
    }
  </style>
  