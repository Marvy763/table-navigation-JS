const myTable = document.querySelector('#my-Table tbody')
    , nbRows  = myTable.rows.length
    , nbCells = myTable.rows[0].cells.length
    , movKey  = { ArrowUp    : p=>{ p.r = (--p.r +nbRows ) % nbRows  }
                , ArrowLeft  : p=>{ p.c = (--p.c +nbCells) % nbCells }
                , ArrowDown  : p=>{ p.r = ++p.r % nbRows  }
                , ArrowRight : p=>{ p.c = ++p.c % nbCells }
                }

// get On Focus event on Table elements
myTable
  .querySelectorAll('input, [contenteditable=true]')
  .forEach(elm=>{elm.onfocus=e=>
    {
    let sPos  = myTable.querySelector('.select')
      , tdPos = elm.parentNode

    if (sPos) sPos.classList.remove('select')

    tdPos.classList.add('select')
    }
  })



document.onkeydown=e=>
  {
  let sPos = myTable.querySelector('.select')
    , evt  = (e==null ? event:e)
    , pos  = { r: sPos?sPos.parentNode.rowIndex:-1
             , c: sPos?sPos.cellIndex:-1
             }

  if ( sPos                 // previous pos focus exist...
   // && evt.altKey
    //&& evt.shiftKey         // addin shift to control
    && movKey[evt.code] )   // evt.ctrlKey... ?
    {
    let loop    = true
      , nxFocus = null
      , cell    = null
    do
      {
      movKey[evt.code](pos)
      cell    = myTable.rows[pos.r].cells[pos.c]                    // possible <td> for new focus...
      nxFocus = cell.querySelector('input, [contenteditable=true]') // get focussable element of <td>

      if ( nxFocus 
      && cell.style.display!=='none' 
      && cell.parentNode.style.display!=='none')
        {
        nxFocus.focus()
        loop = false
        }
      }
      while (loop)
    }
  }
  
  document.addEventListener('contextmenu', event => event.preventDefault());