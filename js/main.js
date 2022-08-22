/**
 * @author A. Weinberger 2014
 *
 * Special thanks to CodyHouse
 *  [http://codyhouse.co/gem/icons-filling-effect/]
 *
 */

$(document).ready(function () {
  // Get some url options like 'js'.
  var getUrlVars = function () {
    var vars = {}
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value
      },
    )
    return vars
  }

  // Often there will be no js suffix so I need to check that and activate
  // effects if useful.
  var js = getUrlVars()['js']
  if (js === undefined) {
    js = '1'
    // Small tweak to ease the use of the site for mobiles,
    // but also full-hd tablets should have effects deactivated.
    var isSmall = window.matchMedia('only screen and (max-width: 760px)')
    var isProbablyMobile =
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/webOS/i)
    if (isSmall.matches || isProbablyMobile) {
      js = '0'
    }
  }

  // Let the url decide if js is used.
  if (js.substring(0, 1) === '1') {
    Menu.init('0px', '-110px', true)
    FocusManager.init()
    window.onscroll = () => {
      FocusManager.onScroll()
    }
  } else {
    // Setup the menu. Js is not used. Only for the menu.
    Menu.init('0px', '-110px', false)
    // Fixed backgrounds seem to be expensive for mobile devices.
    // Reset to normal state.
    $('.page').each(function () {
      $(this).css('background-attachment', 'scroll')
    })
  }
})

/**
 * @class FocusManager Handles the scroll/focus of the sections/pages. This is
 * mostly the fade in
 * of the text blocks and images.
 */
var FocusManager = {
  FADECLASSES: ['fast-fade', 'medium-fade', 'slow-fade'],

  init: function () {
    // Hide all fade ins.
    $('.page')
      .not('#page-front')
      .each((i, page) => {
        FocusManager.FADECLASSES.forEach((cls) => {
          Array.from(page.getElementsByClassName(cls)).forEach((e) => {
            e.style.opacity = 0
          })
        })
      })
  },

  onScroll: function () {
    var scrollOffsetLower =
      $(window).scrollTop() + window.innerHeight * (5 / 100)
    var scrollOffsetUpper =
      $(window).scrollTop() + window.innerHeight * (95 / 100)

    var pages = $('body').find('.page')
    pages.each((i, page) => {
      var pageOffsetMiddle = page.offsetTop + page.offsetHeight / 2

      if (
        scrollOffsetLower < pageOffsetMiddle &&
        pageOffsetMiddle < scrollOffsetUpper
      ) {
        FocusManager.FADECLASSES.forEach((cls) => {
          Array.from(page.getElementsByClassName(cls)).forEach((e) => {
            e.style.opacity = 1
          })
        })
      }
    })
  },
}

/**
 * @class Menu This controls the menu of the page. The task of this object is
 * fade in and fade out and other things.
 */
var Menu = {
  BUTTON: '#nav-button',
  MENU: 'nav',

  MENU_SHOW_SPEED: 500,
  MENU_HIDE_SPEED: 500,

  MENU_HIDE_TIMEOUT: 2000,

  /**
   * Initializes the object.
   *
   * @param {String} outPx Pixel value of right if slided out.
   * @param {String} inPx Pixel value of right if slided in.
   * @param {Boolean} jsActive Is JS being used? Sets the button accordingly.
   */
  init: function (outPx, inPx, jsActive) {
    Menu._outPx = outPx
    Menu._inPx = inPx

    var menuIsShowing = false
    var timeoutID = null

    Menu._hideMenu()

    // Change the icon and address of the js toggle button.
    $noJsBtn = $('#nav-jsToggle')
    $noJsImg = $('#nav-jsToggle img')
    if (jsActive) {
      $noJsBtn.attr('href', '?js=0')
      $noJsImg.attr('src', './img/menu/noJs.png')
    } else {
      $noJsBtn.attr('href', '?js=1')
      $noJsImg.attr('src', './img/menu/yesJs.png')
    }

    // Add the mouseover effect. If the menu is hidden show it. Else do
    // nothing.
    $(Menu.BUTTON).click(function () {
      if (!menuIsShowing) {
        menuIsShowing = true
        Menu._showMenu()
      }
    })

    // Don't hide the menu if the mouse is near it.
    $('body').mousemove(function (event) {
      if (
        Menu._isNear($(Menu.BUTTON), 20, event) ||
        Menu._isNear($(Menu.MENU), 20, event)
      ) {
        window.clearTimeout(timeoutID)
        timeoutID = null
      } else {
        if (timeoutID == null) {
          menuIsShowing = false
          timeoutID = window.setTimeout(Menu._hideMenu, Menu.MENU_HIDE_TIMEOUT)
        }
      }
    })
  },

  /**
   * Shows the menu.
   */
  _showMenu: function () {
    $(Menu.MENU).stop().animate(
      {
        right: Menu._outPx,
      },
      {
        queue: false,
        duration: Menu.MENU_SHOW_SPEED,
        easing: 'swing',
      },
    )
    $(Menu.BUTTON).fadeOut(2 * Menu.MENU_SHOW_SPEED)
  },

  /**
   * Hides the menu.
   */
  _hideMenu: function () {
    $(Menu.MENU).stop().animate(
      {
        right: Menu._inPx,
      },
      {
        queue: false,
        duration: Menu.MENU_HIDE_SPEED,
        easing: 'swing',
      },
    )
    $(Menu.BUTTON).fadeIn(2 * Menu.MENU_HIDE_SPEED)
  },

  /**
   * Determines if an event occured near the element. In this case if the
   * cursor
   * is near the element.
   * @param {Object} element
   * @param {Object} distance An radius around the element in which it is near.
   * @param {Object} event Some event. (MouseMove)
   */
  _isNear: function (element, distance, event) {
    var left = element.offset().left - distance,
      top = element.offset().top - distance,
      right = left + element.width() + 2 * distance,
      bottom = top + element.height() + 2 * distance,
      x = event.pageX,
      y = event.pageY

    return x > left && x < right && y > top && y < bottom
  },
}
