!(function () {
    'use strict';
    var r = window.location,
        o = window.document,
        l = o.currentScript,
        s = 'https://hikka.io/event';

    function t(t, e) {
        try {
            if ('true' === window.localStorage.plausible_ignore)
                return (
                    (a = e),
                    (i = 'localStorage flag') &&
                        console.warn('Ignoring Event: ' + i),
                    void (a && a.callback && a.callback())
                );
        } catch (t) {}
        var a,
            i = {},
            n =
                ((i.n = t),
                (i.u = r.href),
                (i.d = l.getAttribute('data-domain')),
                (i.r = o.referrer || null),
                e && e.meta && (i.m = JSON.stringify(e.meta)),
                e && e.props && (i.p = e.props),
                new XMLHttpRequest());
        n.open('POST', s, !0),
            n.setRequestHeader('Content-Type', 'application/json'),
            n.send(JSON.stringify(i)),
            (n.onreadystatechange = function () {
                4 === n.readyState && e && e.callback && e.callback();
            });
    }

    var e = (window.plausible && window.plausible.q) || [];
    window.plausible = t;
    for (var a, i = 0; i < e.length; i++) t.apply(this, e[i]);

    function n() {
        a !== r.pathname && ((a = r.pathname), t('pageview'));
    }

    var p,
        c = window.history;
    c.pushState &&
        ((p = c.pushState),
        (c.pushState = function () {
            p.apply(this, arguments), n();
        }),
        window.addEventListener('popstate', n)),
        'prerender' === o.visibilityState
            ? o.addEventListener('visibilitychange', function () {
                  a || 'visible' !== o.visibilityState || n();
              })
            : n();
})();
