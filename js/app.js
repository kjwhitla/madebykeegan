<app>
    <header class={ headerClass }>
        <main-nav></main-nav>
    </header>

    <div class="content">
        <home class={ page: true, current: section.home }></home>
        <work class={ page: true, current: section.work }></work>
        <about class={ page: true, current: section.about }></work>
    </div>

    <script>
        var self = this;
        var last = null;
        this.section = {
            home: true,
            work: false
        };

        this.headerClass = 'header-light';

        this.on('mount', function () {
            var $header = $(this.root).find('header');
            headerHeight = $header.outerHeight();
            $(window).on('resize', function () {
                headerHeight = $header.outerHeight();
            });
        });

        /**
         * Primary route handler that triggers store actions.
         */
        function handleRoute (base, page, id) {
            for (s in self.section) {
                if (s === 'home' && (!base && !page)) {
                    self.section[s] = true;
                } else {
                    self.section[s] = (s === page);
                }
            }

            self.headerClass = self.section.home ? 'header-light' : '';

            self.update();

            if (page !== last) {
                $('body').scrollTop(0);
            }

            RiotControl.trigger('action:selectWork', false);
//            RiotControl.trigger('action:selectDirectors', false);
            if (id) {
                var store = page.charAt(0).toUpperCase() + page.slice(1);
                RiotControl.trigger('action:select' + store, id);
            }
        }

        riot.route(handleRoute);
        // kick off w/ whatever current route is (refreshing browser)
        riot.route.exec(handleRoute);
    </script>
</app>


<main-nav>
    <nav>
         <ul>
             <li each={ items } class={ 'is-active': this[3] }>
                 <a href="#{this[0]}"
                    class="menu-item menu-{this[1]}">
                    <svg if={ this[1] === 'home' } viewBox="0 0 198 34" class="nav-logo">
                      <use xlink:href="#pclogo"></use>
                    </svg>
                    { (this[1] === 'home') ? '&nbsp;' : this[2]}
                </a>
             </li>
         </ul>
    </nav>

    <script>
        var self = this;

        this.items = [
            ['/', 'home', 'MadebyKeegan'],
            ['/work', 'work', 'Work'],
//            ['/directors', 'directors', 'Directors'],
//            ['/mixes', 'mixes', 'Mixes'],
            ['/about', 'about', 'Info']
        ];

        function handleRoute (base, page, id) {
            self.items = self.items.map(function (i) {
                i[3] = false;

                if (page === i[1]) i[3] = true;

                return i;
            })

            self.update();
        }

        riot.route(handleRoute);
        // kick off w/ whatever current route is (refreshing browser)
        riot.route.exec(handleRoute);
    </script>
</main-nav>

<home>
    <div class="projects-container parallax">
        <a each={ projects } class="link clip" href="{ url }">
            <div class="cover-image-wrapper" data-stellar-ratio="0.5">
                <img src="{ thumb }" class="cover-thumb" />
            </div>
            <div class="clip-info" data-stellar-ratio="1.25">
                <div class="title">
                    { title }
                    <span class="subtitle">“{ subtitle }”</span>
                </div>
                <div class="director">Directed By: { director }</div>
            </div>
        </a>
    </div>

    <script>
        this.projects = navData.home.projects;

        this.on('update', function () {
            var $root = $(this.root);
            /**
             * For some reason stellar doesn't kick in immediately
             * and will only work when resizing the window. Assuming
             * it's because the projects don't have an actual height yet?
             * Anyway just delaying a bit seems to work.
             */
            setTimeout(function () {
                $root.find('.parallax').stellar({
                    positionProperty: 'transform',
                    hideDistantElements: false,
                    responsive: true
                });
            }, 200);
        });
    </script>
</home>

<work>
    <grouped-accordion
        data={ work }
        route='work'>
    </grouped-accordion>

    <script>
        var self = this;

        this.work = navData.work;

        RiotControl.on('store:workChanged', function (work) {
            self.work = work;
            self.update();
        });

        this.on('mount', function () {
            RiotControl.trigger('action:initWork');
        });
    </script>
</work>

<directors>
    <nested-accordion
        data={ directors }
        route='directors'>
    </nested-accordion>

    <script>
        var self = this;

        this.directors = [];

        this.on('mount', function () {
            RiotControl.trigger('action:initDirectors');
        });

        RiotControl.on('store:directorsChanged', function (directors) {
            self.directors = directors;
            self.update();
        });

        titleClicked (e) {
            var id = e.item.isSelected ? false : e.item.id;

            if (id) {
              riot.route('#/directors')
            }

            RiotControl.trigger('action:selectDirector', id);
        }
    </script>
</directors>

<mixes>
    <grouped-accordion
        data={ mixes }
        route='mixes'
        tag='project-content'>
    </grouped-accordion>

    <script>
        var self = this;

        this.mixes = navData['mix-series'];

        RiotControl.on('store:mixesChanged', function (mixes) {
            self.mixes = mixes;
            self.update();
        });

        this.on('mount', function () {
            RiotControl.trigger('action:initMixes');
        });
    </script>
</mixes>

<about>
    <div class="group-container">
        <h2 class="group-title">About</h2>
        <div class="group-content">
            <p class="hero-text">
                An Independent UX/ UI Designer focused</br>
                on concept, design and implementation.
                </br></br>
                Keegan Whitla, UX/ UI Designer
                </br></br>
                MadebyKeegan</br>
                San Francisco, CA XXXXX
                </br></br>
                +X -XXX- XXXX</br>
                <a href="http://www.twitter.com/madebykeegan" class="hero-text">@madebykeegan</a>
                </br></br>
            </p>
        </div>
    </div>

    <div class="group-container">
        <h2 class="group-title">General Inquiries</h2>
        <div class="group-content">
            <a href="mailto:hi@madebykeegan.com" class="hero-text">
                hi@madebykeegan.com
            </a>
        </div>
    </div>
</about>

<accordion>
    <li each={ opts.items } class={ 'is-selected': isSelected }>
        <h3 class={ project-title: true, scroll-to: isSelected }
            onclick={ parent.handleClick }
            data-id={ content.id }>
            { title }
        </h3>
        <div class={ 'accordion-content': true, 'is-hidden': !isSelected }>
            <raw if={ content.html } content={ content.html } />
        </div>
    </li>

    <script>
        var self = this;
        var $root = $(this.root);
        var route = this.opts.route;

        handleClick (e) {
            var base = '/' + route;

            // collapse if we click something already open
            if (e.item.isSelected) {
                return riot.route(base);
            }

            riot.route(base + '/' + e.item.content.id);
        }
    </script>
</accordion>

<grouped-accordion>
    <div class={ 'no-selections': !selection }>
        <div each={ opts.data } class="group-container">
            <h2 class="group-title">{ title }</h2>
            <ul class="group-content group-list">
                <accordion
                    items={ items }
                    route={ parent.opts.route }
                    >
                </accordion>
            </ul>
        </div>
    </div>

    <script>
        var self = this;
        var $root = $(this.root);

        var self = this;

        this.selection = null;
        this.groupTitleHeight = 0;

        this.on('update', function () {
            var data = self.opts.data;
            this.selection = null;
            for (cat in data) {
                if (this.selection) break;
                for (i in data[cat].items) {
                    if (data[cat].items[i].isSelected) {
                        this.selection = data[cat].items[i].content.id;
                        break;
                    }
                }
            }

            if (!this.selection) return;
            var id = this.selection;

            setTimeout(function () {
                if (!$root.find('.scroll-to').length) return;

                var top = $root.find('.scroll-to').offset().top;
                $('body').animate({
                    scrollTop: (
                        top - (headerHeight + self.groupTitleHeight)
                    )
                }, 200, 'linear');
            }, 340);
        });

        function stickyGroupTitle () {
            var $root = $(this.root);
            var $title = $root.find('.group-title');

            $title.stick_in_parent({
                offset_top: headerHeight - 4
            });

            this.groupTitleHeight = ($title.css('float') === 'none') ?
                $title.outerHeight() :
                0;
        }

        this.on('mount', setTimeout(stickyGroupTitle.bind(this), 10));
        this.on('update', function () {
            // Recalc after accordion transition
            $('body').trigger("sticky_kit:recalc");
            setTimeout(function () {
                $('body').trigger("sticky_kit:recalc");
            }, 340)
        });
    </script>
</grouped-accordion>

<nested-accordion>

    <div class={ 'no-selections': !selection }>
        <div each={ opts.data } class="nested-accordion-parent">
            <div class={ 'nested-accordion-title': true, 'is-selected': isSelected }
                 onclick={ parent.parent.titleClicked }>
                 { title }
            </div>
            <div class={ 'nested-accordion-container': true, 'is-hidden': !isSelected, 'no-selections': !parent.selectedItem }>
                <div class="nested-accordion-content">
                   <img src={ image } if={ image } />
                   { content }
                 </div>
                <div class="group-container">
                  <ul class="group-list">
                      <accordion items={ items }
                                 route={ parent.opts.route }
                                 tag='project-content'>
                      </accordion>
                  </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        var $root = $(this.root);

        this.selection = null;
        this.selectedItem = null;

        this.on('update', function () {
            var data = this.opts.data;
            this.selection = null;
            for (cat in data) {
                if (this.selection) break;
                if (data[cat].isSelected) {
                    this.selection = data[cat].id;
                    break;
                }
            }

            this.selectedItem = null;
            for (cat in data) {
              if (this.selectedItem) break;
              for (i in data[cat].items) {
                  if (data[cat].items[i].isSelected) {
                      this.selectedItem = data[cat].items[i].content.id;
                      break;
                  }
              }
            }

            setTimeout(function () {
                if (!$root.find('.scroll-to').length) return;

                $('body').animate({
                    scrollTop: $root.find('.scroll-to').offset().top - (headerHeight)
                }, 200, 'linear');
            }, 340);
        });
    </script>
</nested-accordion>

<raw>
  <span id="{ opts.content }"></span>

  <script>
      this.root.innerHTML = opts.content

      this.on('update', function () {
          this.root.innerHTML = opts.content
          var $root = $(this.root)
          $root.fitVids()
      })
  </script>
</raw>