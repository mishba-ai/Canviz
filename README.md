# Canviz



<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="./src/output.css" rel="stylesheet" />
  <!-- logo -->
  <link rel="icon" href="/public/logo.png" type="image/icon" />
  <title>Canviz</title>
</head>

<body class="w-full h-screen relative">
  <!-- header -->
  <nav class="w-full overflow-hidden  p-4 px-6  flex justify-between  h-12">
    <!-- <p class="text-red-600">fdfsd</p>  -->
    <ul class="flex justify-between w-56 h-10 bg-[#b38d97]">
      <!-- <li><button><img src="/assets/icons/undo.svg" alt=""></button></li> -->
      <li><button><img src="/assets/icons/redo.svg" alt=""></button></li>
      <li><button><img src="/assets/icons/save.svg" alt=""></button></li>
      <li><button><img src="/assets/icons/clear.svg" alt=""></button></li>
      <li><button><img src="/assets/icons/delete.svg" alt=""></button></li>
      <li><button><img src="/assets/icons/newboard.svg" alt=""></button></li>
    </ul>
    <ul class="flex justify-around w-28 h-10 bg-[#b38d97]">
      <li>
        <button class="" id="darkModeToggle">
          <img src="/assets/icons/darkmode.svg" alt="" />
        </button>
      </li>
      <li class=""><img src="" class="rounded-full h-4 w-4" alt="img" /></li>
    </ul>
  </nav>


  <!-- tab for  -->
  <!-- <div class="relative -bottom-[32.5rem] flex justify-center">
    <div class="border-2 rounded-3xl w-[40rem] h-20 flex bg-white">
      <div class="m-0 p-0 border-r">
        <div
          class="h-[2.4rem] hover:bg-slate-300 w-12 m-0 p-0 flex justify-center rounded-tl-2xl items-center bg-slate-200">
          <img src="/assets/icons/pointer.svg" alt="" class="h-8 w-8" />
        </div>
        <div
          class="h-[2.4rem] hover:bg-slate-300 w-12 m-0 p-0 flex justify-center rounded-bl-2xl items-center bg-slate-200">
          <img src="/assets/icons/handtool.svg" alt="" class="h-10 w-10" />
        </div>
      </div>
       // pencil 
      <div class="flex border-r w-56">
        <div>
          <img src="/assets/icons/pencil.svg" alt="" class="hue-rotate-30 rotate-[135deg] h-20 mt-2 w-24 option active tool" id="brush"/>
        </div>
         //shapes 
        <div class="">
          <ul class="flex flex-wrap w-24 mt-1 options">
            <li class="option tool" id="circ"><img src="/assets/shapes/circle.svg" alt="" class="h-10 w-12" /></li>
            <li class="option tool" id="square"><img src="/assets/shapes/square.svg" alt="" class="h-10 w-12" /></li>
            <li class="option tool" id="triangle"><img src="/assets/shapes/triangle.svg" alt="" class="h-10 w-12" />
            <li class="option tool" id="arrow"><img src="/assets/shapes/arrow.svg" alt="" class="h-9 w-12" /></li>
          </ul>
        </div>
      </div>

      <div class="flex justify-center items-center mx-2 gap-x-2 w-56 border-r">
        <div class="bg-slate-200 w-12 h-12 flex justify-center items-center">
          <img src="/assets/icons/text.svg" alt="" class="w-10 h-10" />
        </div>
        <div class="flex justify-center bg-slate-200 w-12 h-12 items-center">
          <img src="/assets/icons/stamp.svg" alt="" class="w-10 h-10" />
        </div>
        <div><img src="" alt="" /></div>
        <div><img src="" alt="" /></div>
      </div>

      <div class="flex flex-wrap space-x-0 rounded-r-2xl">
        <img src="/assets/images/camera.png" alt="" class="h-14 w-12 " />

        <img src="/assets/images/code.png" alt="" class="h-14 w-14 " />

        <img src="/assets/images/code1.png" alt="" class="h-12 w-12" />

        <img src="/assets/images/gd.png" alt="" class="h-14 w-14 -mt-5" />
      </div>
    </div>
  </div> -->

  <section class="  ">
    <div
      class="absolute bottom-3 w-56 h-12 bg-[#000] left-[50%] translate-x-[-50%] md:w-[300px] lg:w-[450px] rounded-xl">
      <ul>
        <li class="" id="move-tools">
          <div>

          </div>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </section>


  <div id="app"></div>
  <script type="module" src="./src/main.js"></script>
</body>

</html>