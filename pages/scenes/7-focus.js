import * as React from 'react'

import Transition from '../components/Transition'

import useBreakpoint from '../hooks/useBreakpoint'

export default function HomeScene() {
  const [isClosed, setClosed] = React.useState(true)

  const isStatic = useBreakpoint('sm')

  const topTabTrap = React.useRef()
  const bottomTabTrap = React.useRef()

  const firstFocusableElement = React.useRef()
  const lastFocusableElement = React.useRef()

  React.useEffect(() => {
    document.addEventListener('focusin', trapFocus)

    return () => document.removeEventListener('focusin', trapFocus)

    function trapFocus(event) {
      // Only trap focus in modal form
      if (isStatic) return

      if (event.target === topTabTrap.current) {
        lastFocusableElement.current.focus()
      }

      if (event.target === bottomTabTrap.current) {
        firstFocusableElement.current.focus()
      }
    }
  }, [isStatic, firstFocusableElement, lastFocusableElement])

  return (
    <div className="flex bg-gray-100">
      <Transition
        show={isStatic || !isClosed}
        enter="transition-all duration-500"
        enterFrom="-ml-64"
        enterTo="ml-0"
        leave="transition-all duration-500"
        leaveTo="-ml-64"
      >
        <aside
          className={`z-20 bg-white w-64 min-h-screen flex flex-col -ml-64 ${
            isStatic ? '' : 'fixed'
          }`}
        >
          <span ref={topTabTrap} tabIndex="0" />

          <div className="bg-white border-r border-b px-4 h-10 flex items-center justify-between">
            <span className="text-blue py-2">Application</span>

            {!isStatic && (
              <button
                ref={firstFocusableElement}
                autoFocus
                className="w-10 p-1"
                aria-label="Close menu"
                title="Close menu"
                onClick={() => setClosed(true)}
              >
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>

          <div className="border-r py-4 flex-grow relative">
            <nav>
              <ul>
                <li className="p-3">
                  <a href=""> Home </a>
                </li>
                <li className="p-3">
                  <a href=""> Profile </a>
                </li>
                <li className="p-3">
                  <a href=""> Portfolio </a>
                </li>
                <li className="p-3">
                  <a href=""> Contact </a>
                </li>
                <li className="p-3">
                  <a ref={lastFocusableElement} href="">
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <span ref={bottomTabTrap} tabIndex="0" />
        </aside>
      </Transition>

      <Transition
        appear={true}
        show={!isStatic && !isClosed}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black opacity-0" />
      </Transition>

      <main className="flex-grow flex flex-col min-h-screen">
        <header className="bg-white border-b h-10 flex items-center">
          {!isStatic && (
            <button
              tabIndex="1"
              aria-hidden={isClosed}
              className="w-10 p-1"
              aria-label="Open menu"
              title="Open menu"
              onClick={() => setClosed(false)}
            >
              <svg
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}

          <div className="flex flex-grow items-center justify-between px-3">
            <h1 className="text-lg">Home</h1>
            <button className="text-blue-700 underline">Log in</button>
          </div>
        </header>
      </main>
    </div>
  )
}