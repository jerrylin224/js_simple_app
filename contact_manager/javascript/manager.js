var Tags;
var Contacts;
var Game;

$(function() {
  var $menu = $('.menu');
  var $createContact = $('#create');
  var $contactForm = $('.contact');
  var $showContacts = $('section.contact');
  var $submitContact = $('input#submit');

  Contacts = {
    id: 0,
    list: [],
    $addButton: $('#add'),
    show: function() {
      $showContacts.html(this.contactList({
        contacts: this.list }));
    },

    showAll: function() {
      var self = this;
      $('footer input[type="button"]').click(function() {
        self.show();
      });
    },

    delete: function() {
      var self = this;
      $('.contact').on('click', 'input#delete', function(e) {
        var $this = $(this);
        var currentId = $this.closest('.display').attr('id');
        var currentPerson = self.list.find(function(cont) {
          return cont.id === Number(currentId);
        });

        if (confirm("Do you want to delete the contact ?")) {
          $this.closest('.display').remove();
          self.list.splice(self.list.indexOf(currentPerson), 1);
        }

        localStorage.setItem('contacts', JSON.stringify(self.list));
      });
    },

    getId: function() {
      if (!localStorage.getItem('allocatedId')) {
        localStorage.setItem('allocatedId', this.id);
      }
      this.id = Number(localStorage.getItem('allocatedId'));
    },

    getContacts: function() {
      if (!localStorage.getItem('contacts')) {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
      }
      this.list = JSON.parse(localStorage.getItem('contacts'));
    },

    filterTags: function() {
      var self = this;
      $('section').on('click', 'span#tag', function(e) {
        var selected;
        var $this = $(this);
        selected = self.list.filter(function(person) {
          return person.tags.indexOf($this.text()) >= 0;
        });

        if (selected.length > 0) {
          $showContacts.html(self.contactList({
            contacts: selected
          }));
        } else {
          $showContacts.html(self.noResult({
            input: "tag: " + $this.text()
          })).append(self.deleteTag());
        }

      });
    },

    showForm: function() {
      var self = this;
      this.$addButton.on('click', function(event) {
        self.renderCreate();
      });
    },
    cancelForm: function() {
      var self = this;
      $('input#cancel').on('click', function() {
        self.renderContact();
      });
    },
    edit: function() {
      var self = this;
      $('.contact').on('click', 'input#edit', function(e) {
        var $this = $(this);
        var currentId = $this.closest('.display').attr('id');
        var contacts = self.list;
        var currentContact;
        self.renderCreate();
        $('#create h4').html('Edit Contact');
        currentContact = contacts.filter(function(item) {
          return item.id === Number(currentId);
        })[0];

        $('input[name="id"]').val(Number(currentContact.id));
        $('input[name="name"]').val(currentContact.fullname);
        $('input[name="mail"]').val(currentContact.email);
        $('input[name="phone"]').val(currentContact.phone);
        $('input[name="tag"]').val(currentContact.tags);
      });
    },
    submit: function() {
      var self = this;
      $submitContact.on('click', function() {
        var data = {
          id: Number($('input[name="id"]').val()),
          fullname: $('input[name="name"]').val(),
          email: $('input[name="mail"]').val(),
          phone:$('input[name="phone"]').val(),
          tags: $('input[name="tag"]').val().split(","),
        };

        if (data.tags.length === 1 && data.tags[0] === "") {
          data.tags = [];
        }

        self.submitForm(data);
        $createContact.get(0).reset();
        self.renderContact();

      });
    },

    renderCreate: function() {
      $menu.slideUp();
      $('input[name="id"]').val("");
      $contactForm.slideUp();
      $createContact.slideDown();
    },

    renderContact: function() {
      $menu.slideDown();
      $contactForm.slideDown();
      $createContact.get(0).reset();
      $createContact.slideUp('slow');
    },

    submitForm: function(currentPerson) {
      var formId = Number($('input[name="id"]').val());
      if ( formId === 0) {
        this.createContact(currentPerson);
      } else {
        this.editContact(currentPerson);
      }
    },

    createContact: function(newPerson) {
      this.id += 1;
      newPerson.id = this.id;
      this.list.push(newPerson);
      $('input[name="id"]').val(newPerson.id);
      localStorage.setItem('allocatedId', Number(newPerson.id));
      $showContacts.append(this.displayTemplate(newPerson));
      localStorage.setItem('contacts', JSON.stringify(this.list));
    },

    editContact: function(currentPerson) {
      var modifyOne = this.list.filter(function(person) {
        return person.id === Number(currentPerson.id);
      })[0];
      var index = this.list.indexOf(modifyOne);
      this.list[index] = currentPerson;
      localStorage.setItem('contacts', JSON.stringify(this.list));
      $('#' + currentPerson.id).html(this.displayTemplate(currentPerson));
    },

    renderSearch: function() {
      var self = this;
      $('#search > input').on('focus', function() {
        var $this = $(this);
        var selected;
        $this.on('keyup', function(e) {
          selected = self.list.filter(function(person) {
            return person.fullname.indexOf($this.val()) >= 0;
          });
          if (selected.length > 0) {
            $showContacts.html(self.contactList({
              contacts: selected
            }));
          } else {
            $showContacts.html(self.noResult({
              input: $this.val()
            }));
          }
        });
      });
    },
    init: function() {
      this.getContacts();
      this.getId();
      this.show();
      this.showForm();
      this.edit();
      this.delete();
      this.cancelForm();
      this.submit();
      this.filterTags();
      this.showAll();
      this.renderSearch();
    },
};

  Tags = {
    list: [],
    saveTags: function() {
      localStorage.setItem('tags', JSON.stringify(this.list));
    },
    renderTags: function() {
      $('#tags > p').html(this.tagTemplate({
        tags: this.list
      }));
    },
    getTags: function() {
      if (!localStorage.getItem('tags')) {
        localStorage.setItem('tags', JSON.stringify(this.list));
      }
      this.list = JSON.parse(localStorage.getItem('tags'));
    },
    addTags: function(currentTag) {
      currentTag.forEach(function(tag) {
        if (this.list.indexOf(tag) === -1) {
          this.list.push(tag);
        }
      }.bind(this));
      localStorage.setItem('tags', JSON.stringify(this.list));
    },

    deleteTag: function(currentTag) {
      this.list.splice(this.list.indexOf(currentTag), 1);
      localStorage.setItem('tags', JSON.stringify(this.list));
    },
    bind: function() {
      var self = this;
      $submitContact.on('click', function() {
        $this = $(this);
        var currentTags = $('input[name="tag"]').val().split(",");
        if (currentTags.length === 1 && currentTags[0] === "") {
          currentTags = [];
        }
        self.addTags(currentTags);
        self.renderTags();
      });

      $('.contact').on('click', 'input[type="button"]', function(e) {
        $this = $(this);
        self.deleteTag($this.text());
        self.renderTags();
      });
    },
    init: function() {
      this.getTags();
      this.renderTags();
      this.bind();
    }
  };

  Game = {
    createTemplate: function() {
      Tags.tagTemplate = Handlebars.compile($('#tagTemplate').html());
      Contacts.contactList = Handlebars.compile($('#contactList').html());
      Contacts.displayTemplate = Handlebars.compile($('#displayContact').html());
      Contacts.deleteTag = Handlebars.compile($('#deleteTag').html());
      Contacts.noResult = Handlebars.compile($('#noResult').html());
      Handlebars.registerPartial('displayContact', $('#displayContact').html());
    },
    init: function() {
      this.createTemplate();
      Tags.init();
      Contacts.init();
    }
  };

  var game = Object.create(Game);
  game.init();

});