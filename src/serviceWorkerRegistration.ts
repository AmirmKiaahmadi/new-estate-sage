// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
)

type Config = {
    onSuccess?: (registration: ServiceWorkerRegistration) => void
    onUpdate?: (registration: ServiceWorkerRegistration) => void
}

export function register(config?: Config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return
        }

        window.addEventListener('install', function (e) {
            //@ts-ignore
            e.waitUntil(
                Promise.all([
                    //@ts-expect-error
                    caches.open(STATIC_CACHE_NAME),
                    //@ts-expect-error
                    caches.open(APP_CACHE_NAME),
                    //@ts-expect-error
                    window.skipWaiting(),
                ]).then(function (storage) {
                    const static_cache = storage[0]
                    const app_cache = storage[1]
                    return Promise.all([
                        //@ts-expect-error
                        static_cache.addAll(CACHE_STATIC),
                        //@ts-expect-error
                        app_cache.addAll(CACHE_APP),
                    ])
                })
            )
        })

        window.addEventListener('activate', function (e) {
            //@ts-ignore
            e.waitUntil(
                Promise.all([
                    //@ts-expect-error
                    window.clients.claim(),
                    caches.keys().then(function (cacheNames) {
                        return Promise.all(
                            cacheNames.map(function (cacheName) {
                                if (
                                    //@ts-expect-error
                                    cacheName !== APP_CACHE_NAME &&
                                    //@ts-expect-error
                                    cacheName !== STATIC_CACHE_NAME
                                ) {
                                    console.log('deleting', cacheName)
                                    return caches.delete(cacheName)
                                }
                            })
                        )
                    }),
                ])
            )
        })

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.ts`

            if (isLocalhost) {
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config)

                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then((registration) => {
                    console.log(
                        'This web app is being served cache-first by a service ' +
                            'worker. To learn more, visit https://cra.link/PWA'
                    )
                    // Use the PushManager to get the user's subscription to the push service.
                })
            } else {
                // Is not localhost. Just register service worker
                registerValidSW(swUrl, config)
            }
        })
    }
}

function registerValidSW(swUrl: string, config?: Config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.pushManager
                .getSubscription()
                .then(async function (subscription) {
                    console.log(subscription)
                    // If a subscription was found, return it.
                    // if (subscription) {
                    //   console.log(subscription);
                    //   return subscription;
                    // }
                    // return registration.pushManager.subscribe({
                    //   userVisibleOnly: true,
                    //   applicationServerKey: urlBase64ToUint8Array(
                    //     'BO60T_oiPYcjRST9Dkppg-R69kEoLjSZliLw0EvTwAof6IdU8v-7c4ROpG16LPG0fsoGH7k_gvXGBjnyxvEov2c',
                    //   ),
                    // });

                    // Get the server's public key
                    //const response = await fetch('./vapidPublicKey');
                    //const vapidPublicKey = await response.text();
                    //const vapidKeys = webpush.generateVAPIDKeys();
                    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
                    // urlBase64ToUint8Array() is defined in /tools.js
                    //const convertedVapidKey = vapidKeys;
                    // webpush.setVapidDetails(
                    //   'https://shop.beta.mazraeapp.com/',
                    //   vapidKeys.publicKey,
                    //   vapidKeys.privateKey,
                    // );
                    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                    // send notifications that don't have a visible effect for the user).
                })
            // .then(subscription => {
            //   console.log('info workers');
            //   console.log(subscription);
            //   try {
            //     const userProfile = window.localStorage.getItem('user');
            //     fetch(
            //       process.env.REACT_APP_API_URL + '/api/profile/supplier/set-fcm',
            //       {
            //         method: 'PATCH',
            //         headers: {
            //           'Content-type': 'application/json',
            //           Authorization: userProfile
            //             ? `Token ${JSON.parse(userProfile)?.token}`
            //             : '',
            //         },
            //         body: JSON.stringify({
            //           fcm_token: subscription,
            //         }),
            //       },
            //     );
            //   } catch (error) {
            //     console.log(error);
            //   }
            // });

            registration.update()
            setInterval(
                () => {
                    registration.update()
                },
                1000 * 60 * 5
            )

            registration.onupdatefound = () => {
                const installingWorker = registration.installing
                if (installingWorker == null) {
                    return
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            // console.log('update find...');

                            //  ShowToastMessage({
                            //    type: 'Success',
                            //    text: 'در حال به روزرسانی...',
                            //  });
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000)
                            //@ts-expect-error
                            registration.waiting.postMessage({
                                type: 'SKIP_WAITING',
                            })
                            //
                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration)
                            }
                        } else {
                            // console.log('display');
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            // console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration)
                            }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error during service worker registration:', error)
        })
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            // Ensure service worker exists, and that we really are getting a JS file.
            const contentType = response.headers.get('content-type')
            if (
                response.status === 404 ||
                (contentType != null &&
                    contentType.indexOf('javascript') === -1)
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload()
                    })
                })
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config)
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            )
        })
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister()
            })
            .catch((error) => {
                console.error(error.message)
            })
    }
}
// function urlBase64ToUint8Array(base64String: string) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
