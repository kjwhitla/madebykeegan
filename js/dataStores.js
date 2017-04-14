function mapItemHtmlContent (id) {
    return function (i, callback) {
        if (!i.content.id) return callback(null, i);

        i.isSelected = false;
        i.isSelected = (i.content.id === id);

        i.content.html = ''

        if (!i.isSelected || !i.content.path) return callback(null, i);

        $.get(i.content.path, function (body) {
            i.content.html = body;
            callback(null, i);
        }).error(function () {
            i.content.html =
            '<p>' +
                'This is placeholder content. <br>' +
                'Add an html file for this project: <br>' +
                '<pre>' + i.content.path + '</pre>' +
            '</p>';

            callback(null, i);
        });
    }
}

function mapGroup (group, id, callback) {
    mapAsync(group, function (content, callback) {
        mapAsync(
            content.items,
            mapItemHtmlContent(id),
            function (err, items) {
                if (err) return callback(err);

                content.items = items;
                callback(null, content);
            }
        )
    }, callback)
}


function WorkStore () {
    if (!(this instanceof WorkStore)) return new WorkStore();

    riot.observable(this);

    var self = this;

    this.work = navData.work;

    this.on('action:initWork', function () {
        self.trigger('store:workChanged', self.work);
    });

    this.on('action:selectWork', function (id) {
        mapGroup(self.work, id, function (err, work) {
            self.trigger('store:workChanged', work);
        });
    });
}